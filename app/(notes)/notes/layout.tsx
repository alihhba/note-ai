import Navbar from "@/components/Navbar";
import React from "react";



const NotesPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-3">
      <Navbar />
      {children}
    </div>
  );
};

export default NotesPageLayout;
