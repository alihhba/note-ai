"use client";
import { useModal } from "@/hooks/modal-store";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { Message } from "ai";
import { useEffect, useRef } from "react";

const AiChat = () => {
  const {
    messages,
    input,
    error,
    handleInputChange,
    setMessages,
    isLoading,
    handleSubmit,
  } = useChat();
  const { isOpen, onClose, type } = useModal();

  const isChatBoxOpen = isOpen && type === "chatBox";

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        " bottom-0 w-full z-50 bg-white  max-w-[500px] right-2 shadow-lg border h-2/3 rounded-lg p-2",
        isChatBoxOpen ? "fixed" : "hidden"
      )}
    >
      <div className="relative h-full w-full flex flex-col ">
        <div
          onClick={() => onClose()}
          className="cursor-pointer  flex justify-end w-full absolute top-1 right-3"
        >
          <X className="w-4 h-4" />
        </div>
        <div className="w-full h-full overflow-y-scroll mt-6" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong , please try again",
                id: "",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex items-center justify-center w-full h-full">
              Ask question about you notes.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center  gap-1">
          <Input
            value={input}
            ref={inputRef}
            onChange={handleInputChange}
            placeholder="start chat ..."
            className="outline-none border focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiChat;

function ChatMessage({ message: { role, content } }: { message: Message }) {
  return (
    <div
      className={cn(
        "my-4 flex justify-start",
        role === "user" && "justify-end"
      )}
    >
      {/* <div>{role}</div> */}
      <div
        className={cn(
          "max-w-[450px] w-fit rounded-lg  flex py-2 px-3",
          role === "user" ? "bg-zinc-700  text-white" : "bg-white shadow-lg "
        )}
      >
        {content}
      </div>
    </div>
  );
}
