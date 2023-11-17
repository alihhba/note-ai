"use client";
import { useModal } from "@/hooks/modal-store";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

const OpenAiCahtBox = () => {
  const { onOpen } = useModal();
  return (
    <div>
      {" "}
      <Button size={"lg"} onClick={() => onOpen("chatBox")}>
        <Bot className="w-4 h-4 text-white mr-2" />
        Chat Bot
      </Button>
    </div>
  );
};

export default OpenAiCahtBox;
