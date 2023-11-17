import React from "react";
import CreateNoteModal from "../modals/CreateNoteModal";
import CartModal from "../modals/CartModal";
import AiChat from "../AiChat";

const ModalProvider = () => {
  return (
    <div>
      <CreateNoteModal />
      <CartModal />
      <AiChat />
    </div>
  );
};

export default ModalProvider;
