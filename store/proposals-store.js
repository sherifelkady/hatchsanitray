import { create } from "zustand";

import { toast } from "sonner";
export const Proposals = create((set) => ({
  proposal: null,
  products: [],
  grandTotalCheck: false,
  // proposals: [],
  // {proposal_name:"",proposal_description:"", proposal_price:"", proposal_image:"", proposal_category:"" , product_name:"", product_price:"" , product_image:""},
  addProposal: (proposal) => set(() => ({ proposal })),
  checkGrandTotal: () =>
    set((state) => ({ grandTotalCheck: !state.grandTotalCheck })),
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
  grandTotal: () => {
    const { products } = Proposals.getState();
    return products.reduce((acc, product) => {
      const quantity = product.quantity ?? 1;
      const price = Number(product.price ?? 0);
      return acc + price * quantity;
    }, 0);
  },
  changeProductQuantity: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      ),
    })),
}));
