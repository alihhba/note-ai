import { Note } from "@prisma/client";
import { string } from "zod";
import { create } from "zustand";

export type ModalType = "createNode" | "cartModal" | 'chatBox';

interface ModalData {
  note?: Note;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
