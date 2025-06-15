import Image from "next/image";
import React from "react";

export default function ProductsCard() {
  return (
    <div className="bg-white rounded-xs p-4 shadow-xs">
      <Image
        src="/images/products/1.jpg"
        width={300}
        height={300}
        alt="product"
      />
      <h2> Saintry Product</h2>
    </div>
  );
}
