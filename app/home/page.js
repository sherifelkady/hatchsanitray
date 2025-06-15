import ProductsCard from "@/components/products/ProductsCard";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <section className="flex justify-between gap-4 px-28 mt-10 ">
      <Sidebar />
      {/* ===================== All Products =================== */}
      <main className="w-5/6 bg-[#f9fafb] flex gap-2 py-4 px-4 justify-between">
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
      </main>
    </section>
  );
}
