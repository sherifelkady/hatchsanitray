import { create } from "zustand";

export const Proposals = create((set) => ({
  proposals: [],
  setProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),
}));
