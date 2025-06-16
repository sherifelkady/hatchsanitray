import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-1/6 shadow-xs bg-gray-50 px-6 py-4 rounded">
      <div className="flex justify-center">
        <Image src="/images/logo.gif" width={100} height={100} alt="logo" />
      </div>

      <div className="mt-10 mb-4">
        <h3 className=" text-md font-bold">MAIN</h3>
        <ul className="text-[18px] flex flex-col gap-2 mt-2">
          <li className="active  bg-blue-100 text-sky-800 bg-opacity-50 rounded-xs p-1">
            All Products
          </li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>

      <div>
        <h3 className=" text-md font-bold uppercase ">categories</h3>
        <ul className=" text-[18px]">
          <li>Home</li>
          <li>Products</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
    </aside>
  );
}
