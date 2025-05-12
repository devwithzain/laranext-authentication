import { create } from "zustand";

interface ResetCodeStore {
   code: string;
   setCode: (code: string) => void;
}

const useResetCodeStore = create<ResetCodeStore>((set) => ({
   code: "",
   setCode: (code) => set({ code }),
}));

export default useResetCodeStore;
