"use client";
import { useModal } from "@/hooks/modal-store";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface cartProps {
  note: {
    id: string;
    title: string;
    content: string;
    userId: string;
    craetedAt: Date;
    updatedAt: Date;
  };
}

const Cart = ({ note }: cartProps) => {
  const { onOpen, data } = useModal();
  return (
    <div
      onClick={() =>
        onOpen("cartModal", {
          note: note,
        })
      }
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader className="">
          <CardTitle>{note?.title}</CardTitle>
          <CardDescription>{note?.content}</CardDescription>
        </CardHeader>
        <CardFooter className="">
          <div className="flex w-full items-center gap-1 justify-between">
            <p className="flex flex-col items-center text-sm text-zinc-500">
              <p className="text-start w-full">createdAt</p>
              {note.craetedAt.toDateString()}
            </p>
            {note.craetedAt < note.updatedAt && (
              <p className="flex flex-col items-center text-sm text-zinc-500">
                <p className="text-start w-full">updatedAt</p>
                {note.craetedAt < note.updatedAt &&
                  note.updatedAt.toDateString()}
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;
