import ProductsList from "@/components/products/ProductsList";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;
  console.log("this is our id", id);
  const getProducts = await fetch(
    `${process.env.API_URL}sub-categories/69/products`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const products = await getProducts.json();
  console.log("this is our products", products);
  return (
    <section className="flex xl:flex-row flex-col justify-between gap-4 px-15 mt-10 ">
      <Sidebar />
      {products && <ProductsList products={products.data} />}
    </section>
  );
}
