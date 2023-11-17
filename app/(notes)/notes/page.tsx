import Cart from "@/components/Cart";
import OpenAiCahtBox from "@/components/OpenAiCahtBox";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";

const NotePage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const Notes = await db.note.findMany({ where: { userId } });

  // try {
  //   const Notes = await axios.get("http://localhost:3000/api/notes");
  //   console.log(Notes);
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <div className="my-3">
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 cursor-pointer h-max grid-flow">
        {Notes?.map((note) => (
          <div key={note.id} className="flex flex-col h-full">
            <Cart note={note} />
            <div className="fixed bottom-2 right-2">
              <OpenAiCahtBox />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotePage;
