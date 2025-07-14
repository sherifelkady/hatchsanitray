import StaticsCard from "@/components/home/statics/StaticsCard";
import ProductsCard from "@/components/products/ProductsCard";
import ProductsList from "@/components/products/ProductsList";
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
    <section className="flex lg:flex-row flex-col justify-between gap-4 px-15 mt-10 ">
      <Sidebar categories={categoriesData != null && categoriesData} />
      {/* ===================== All Products =================== */}
      <section className="flex-col gap-4 w-[82%]">
        <StaticsCard />
        <ProductsList />
      </section>
    </section>
  );
}
