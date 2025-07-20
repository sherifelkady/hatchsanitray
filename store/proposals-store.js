import { create } from "zustand";

export const Proposals = create((set) => ({
  proposal: null,
  products: [],
  // proposals: [],
  // {proposal_name:"",proposal_description:"", proposal_price:"", proposal_image:"", proposal_category:"" , product_name:"", product_price:"" , product_image:""},
  addProposal: (proposal) => set(() => ({ proposal })),

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
