import React from "react";
import ProductsCard from "./ProductsCard";

export default function ProductsList({ products }) {
  return (
    <main className="w-full bg-[#f9fafb] grid gap-2 py-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between ">
      {products?.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
      <ProductsCard />
    </main>
  );
}
