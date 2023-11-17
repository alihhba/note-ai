import { db } from "@/lib/db";
import { getEmbedding } from "@/lib/openai";
import { noteIndex } from "@/lib/pinecone";
import {
  deleteNoteSchema,
  editNoteSchema,
  noteSchema,
} from "@/lib/validation/noteVallidation";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const bodyPars = noteSchema.safeParse(body);

    if (!bodyPars.success) {
      return new NextResponse("body parser error ", { status: 40 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized error", { status: 401 });
    }
    const { title, content } = bodyPars.data;

    const embedding = await getEmbeddingForNote(title, content);

    const note = await db.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          content,
          userId,
        },
      });

      await noteIndex.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return note;
    });

    // const note = await db.note.create({
    //   data: {
    //     title,
    //     content,
    //     userId,
    //   },
    // });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.log(`[CREATE_NOTE_ERROR]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const { body } = await req.json();

    const bodyParser = deleteNoteSchema.safeParse(body);

    if (!bodyParser.success) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const { id } = bodyParser.data;

    const Note = await db.note.findUnique({ where: { id } });

    if (!Note) {
      return new NextResponse("note not found", { status: 404 });
    }

    if (!userId || userId !== Note.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.note.delete({ where: { id } });

    return NextResponse.json({ message: "note deleted" }, { status: 200 });
  } catch (error) {
    console.log(`[DELETE_NOTE_ERROR]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function getEmbeddingForNote(title: string, content: string) {
  return getEmbedding(title + "\n\n" + content);
}
