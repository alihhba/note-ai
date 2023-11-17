import { db } from "@/lib/db";
import { editNoteSchema } from "@/lib/validation/noteVallidation";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getEmbeddingForNote } from "../route";
import { noteIndex } from "@/lib/pinecone";

export async function PATCH(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth();
    const { title, content } = await req.json();

    // const bodyParser = editNoteSchema.safeParse(body);

    // if (!bodyParser.success) {
    //   return new NextResponse("Invalid input", { status: 400 });
    // }

    // const { content, title } = bodyParser.data;

    const Note = await db.note.findUnique({ where: { id: params.noteId } });

    if (!Note) {
      return new NextResponse("note not found", { status: 404 });
    }

    if (!userId || userId !== Note.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const embedding = await getEmbeddingForNote(title, content);

    const updatedNote = await db.$transaction(async (tx) => {
      const updatedNote = await tx.note.update({
        where: { id: params.noteId },
        data: {
          content,
          title,
        },
      });

      await noteIndex.upsert([
        {
          id: params.noteId,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return updatedNote;
    });

    // const updatedNote = await db.note.update({
    //   where: { id: params.noteId },
    //   data: {
    //     content,
    //     title,
    //   },
    // });

    return NextResponse.json({ updatedNote }, { status: 200 });
  } catch (error) {
    console.log(`[UPDATE_NOTE_ERROR]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.noteId) {
      return new NextResponse("serverId not found", { status: 401 });
    }
    const note = await db.note.findUnique({ where: { id: params.noteId } });

    await db.$transaction(async (tx) => {
      await tx.note.delete({
        where: {
          id: params.noteId,
          userId: note?.userId,
        },
      });

      await noteIndex.deleteOne(params.noteId);
    });

    // await db.note.delete({
    //   where: {
    //     id: params.noteId,
    //     userId: note?.userId,
    //   },
    // });
    return NextResponse.json(
      { message: "deleted note successfully" },
      { status: 202 }
    );
  } catch (error) {
    console.log(`[DELETE_NOTE_ERROR]`, error);
    return new NextResponse("Interval error", { status: 500 });
  }
}
