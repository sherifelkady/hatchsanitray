import { create } from "zustand";

export const Proposals = create((set) => ({
  proposals: [],
  // {proposal_name:"",proposal_description:"", proposal_price:"", proposal_image:"", proposal_category:"" , product_name:"", product_price:"" , product_image:""},
  addProposal: (proposal) =>
    set((state) => ({ proposals: [...state.proposals, proposal] })),
}));
