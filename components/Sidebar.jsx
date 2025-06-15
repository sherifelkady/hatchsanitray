import React from "react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-1/6">
      <Image src="/images/logo.gif" width={100} height={100} alt="logo" />
      <div className="mt-10 mb-4">
        <h3 className="-p-3 text-md font-bold">MAIN</h3>
        <ul className="ml-4 text-[18px] flex flex-col gap-2 mt-2">
          <li className="active  bg-blue-100 text-sky-800 bg-opacity-50 rounded-xs p-1">
            Home
          </li>
          <li>Products</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>

      <div>
        <h3 className="-p-3 text-md font-bold uppercase ">categories</h3>
        <ul className="ml-4 text-[18px]">
          <li>Home</li>
          <li>Products</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
    </aside>
  );
}
