import { create } from "zustand";

import { toast } from "sonner";
export const Proposals = create((set) => ({
  proposal: null,
  products: [],
  // proposals: [],
  // {proposal_name:"",proposal_description:"", proposal_price:"", proposal_image:"", proposal_category:"" , product_name:"", product_price:"" , product_image:""},
  addProposal: (proposal) => set(() => ({ proposal })),

  addProduct: (product) => {
    if (Proposals.getState().products.some((p) => p.id === product.id)) {
      toast.info("Product already added");
      return;
    } else {
      set((state) => ({
        products: [...state.products, product],
      }));
      toast.success("Product added successfully");
    }
  },

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  changeProductQuantity: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      ),
    })),
}));
