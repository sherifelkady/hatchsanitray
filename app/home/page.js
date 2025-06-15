import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <section className="flex justify-between gap-4 px-28 mt-10 ">
      <aside className="w-1/6">
        <Image src="/images/logo.gif" width={100} height={100} alt="logo" />
        <div className="mt-10 mb-4">
          <h3 className="-p-3 text-md font-bold">Main</h3>
          <ul className="ml-4 text-[18px]">
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="-p-3 text-md font-bold">Categories</h3>
          <ul className="ml-4 text-[18px]">
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
      </aside>
      <main className="w-5/6 bg-[#f9fafb]">asdasasd</main>
    </section>
  );
}
