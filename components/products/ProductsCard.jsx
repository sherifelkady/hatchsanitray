import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ProductsCard() {
  return (
    <div className="bg-white rounded-xs p-4 shadow-xs flex flex-col gap-4">
      <Image
        src="/images/products/1.jpg"
        width={300}
        height={300}
        alt="product"
        className="rounded"
      />
      <h2> Saintry Product</h2>
      <p className="text-sm text-gray-400 font-light">
        Simple design with practical performance
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sky-500 ">Rs. 1000</span>
        <Button className="bg-sky-600 rounded-[4px] p-5 cursor-pointer">
          {" "}
          Add to Proposal
        </Button>
      </div>
    </div>
  );
}
