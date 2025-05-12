import { create } from "zustand";
import { ThooksProps } from "@/types";

const useNewPasswordModal = create<ThooksProps>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}));

export default useNewPasswordModal;
