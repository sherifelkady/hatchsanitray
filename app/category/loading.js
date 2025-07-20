import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Image from "next/image";
import React from "react";

export default function loading() {
  return (
    <section className="flex lg:flex-row flex-col justify-between gap-4 px-15 mt-10 ">
      <Sidebar />
      {/* ===================== All Products =================== */}
      <section className="flex-col gap-4 xl:w-[82%] w-full">
        {/* <StaticsCard /> */}
        <TopBar />
        <main className="w-full bg-[#f9fafb] flex justify-center items-center mt-40 ">
          <Image src="/90-ring-with-bg.svg" width={100} height={100} alt="" />
        </main>
      </section>
    </section>
  );
}
