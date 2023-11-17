import AiChat from "@/components/AiChat";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "note-ai notes",
};

const NotesPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-3">
      <Navbar />
      {children}
    </div>
  );
};

export default NotesPageLayout;
