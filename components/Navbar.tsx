"use client";
import React from "react";
import { Button } from "./ui/button";
import { Bot, Plus } from "lucide-react";
import { UserButton, auth } from "@clerk/nextjs";
import { useModal } from "@/hooks/modal-store";

const Navbar = () => {
  const { onOpen } = useModal();
  //   const { userId } = auth();
  return (
    <nav className="flex  sticky top-0  bg-white z-50 items-center justify-between mx-auto max-w-7xl  py-3 border-b">
      <p>Note ai</p>

      <div className="flex items-center gap-2">
        <Button size={"lg"} onClick={() => onOpen("createNode")}>
          <Plus className="w-4 h-4 text-white mr-2" />
          Add Note
        </Button>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: { width: "40px", height: "2.5rem" } },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
