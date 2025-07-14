import React from "react";
import ProductsCard from "./ProductsCard";

export default function ProductsList() {
  return (
    <main className="w-full bg-[#f9fafb] grid gap-2 py-4 px-4 grid-cols-1 lg:grid-cols-3 justify-between ">
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
    </main>
  );
}
