import Sidebar from "@/components/Sidebar";
import React from "react";

export default async function page({ params }) {
  const id = params.id;
  // const getProducts = await fetch(
  //   `${process.env.API_URL}/sub-categories/69/products?lang=en`,
  //   {
  //     method: "GET",
  //     cache: "no-store",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const products = await getProducts.json();
  // console.log("this is our products", products);
  return (
    <section className="flex lg:flex-row flex-col justify-between gap-4 px-15 mt-10 ">
      <Sidebar />
      this is our id {params.id}
    </section>
  );
}
