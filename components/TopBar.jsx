"use client";
import { Proposals } from "@/store/proposals-store";
import Link from "next/link";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";

export default function TopBar() {
  const proposals = Proposals((state) => state.proposals);
  const products = Proposals((state) => state.products);
  return (
    <div className="w-full h-[70px] bg-gray-600 text-white py-6 rounded flex justify-between items-center px-10">
      <div className="userInfo flex items-center gap-2">
        <FaRegUser /> <div className="text-sm"> Hello Sherif</div>
      </div>

      <form className="flex items-center gap-2 w-3/6">
        <input
          id="search"
          placeholder="Search"
          className="text-white text-sm border border-gray-400 h-9 w-12/12  p-2 rounded"
          type="search"
        />
      </form>
      <Link href="/proposal" className="flex items-center gap-2 relative">
        <AiOutlineProduct size={25} />
        {products.length > 0 && (
          <div className="flex justify-center items-center absolute text-xs top-0 left-4 w-4 h-4 bg-red-600 rounded-full">
            {products.length > 0 && products?.length}
          </div>
        )}
      </Link>
    </div>
  );
}
