import { create } from "zustand";
import { CreateNoteProps } from "../api/clientApi";
import { persist } from "zustand/middleware";

interface NoteDraftStore {
  draft: CreateNoteProps;
  setDraft: (note: CreateNoteProps) => void;
  clearDraft: () => void;
}

const initialDraft: CreateNoteProps = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
