import StaticsCard from "@/components/home/statics/StaticsCard";
import ProductsCard from "@/components/products/ProductsCard";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import React from "react";

export default async function Home() {
  // ===================== get Categories ====================================
  const API = process.env.API_URL;
  console.log("API URL:", process.env.API_URL);
  const categories = await fetch(`${API}categories?lang=en`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const categoriesData = await categories.json();

  // ===================== get Categories End ================================

  return (
    <section className="flex justify-between gap-4 px-20 mt-10 ">
      <Sidebar categories={categoriesData != null && categoriesData} />
      {/* ===================== All Products =================== */}
      <section className="flex-col gap-4 w-4/6">
        <StaticsCard />
        <main className="w-4/6 bg-[#f9fafb] grid gap-2 py-4 px-4 grid-cols-2 justify-between ">
          <ProductsCard />
          <ProductsCard />
          <ProductsCard />
          <ProductsCard />
          <ProductsCard />
          <ProductsCard />
          <ProductsCard />
          <ProductsCard />
        </main>
      </section>
    </section>
  );
}
