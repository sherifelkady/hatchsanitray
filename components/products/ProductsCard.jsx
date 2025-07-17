import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ProductsCard({ product }) {
  const imgSrc = product?.image ? product?.image : "/images/not-found.png";
  return (
    <div className="bg-white rounded-xs   p-4 shadow-xs flex flex-col gap-4">
      <div className="lg:w-full w-full h-[383px] overflow-hidden relative ">
        <Image
          src={imgSrc}
          fill={true}
          alt="product"
          className=" cust-trans object-cover rounded"
          quality={100}
          objectFit="cover"
        />
      </div>

      <h2> {product?.localized_name}</h2>
      <p className="text-sm text-gray-400 font-light">
        Simple design with practical performance
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sky-500 ">Rs. 1000</span>
        <Button className="bg-sky-600 rounded-[4px] p-5 cursor-pointer">
          Add to Proposal
        </Button>
      </div>
    </div>
  );
}
