import StaticsCard from "@/components/home/statics/StaticsCard";
import ProductsCard from "@/components/products/ProductsCard";
import ProductsList from "@/components/products/ProductsList";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import React from "react";

export default async function Home() {
  return (
    <section className="flex lg:flex-row flex-col justify-between gap-4 px-15 mt-10 ">
      <Sidebar />
      {/* ===================== All Products =================== */}
      <section className="flex-col gap-4 w-[82%]">
        {/* <StaticsCard /> */}
        <ProductsList />
      </section>
    </section>
  );
}
