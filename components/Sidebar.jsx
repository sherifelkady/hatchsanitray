import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-1/6 shadow-xs bg-white px-6 py-4 rounded">
      <div className="flex justify-center">
        <Image src="/images/logo.gif" width={100} height={100} alt="logo" />
      </div>

      <div className="mt-10 mb-4">
        <h3 className=" text-sm font-bold">MAIN</h3>
        <ul className="text-[15px] flex flex-col gap-2 mt-2 text-gray-500">
          <li className="active  bg-blue-100 text-sky-800 bg-opacity-50 rounded-sm p-2">
            Dashboard
          </li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>

      <div>
        <h3 className=" text-sm font-bold uppercase ">categories</h3>
        <ul className=" text-[15px] flex flex-col gap-2 mt-2 text-gray-500">
          <li>Home</li>
          <li>Products</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
    </aside>
  );
}
