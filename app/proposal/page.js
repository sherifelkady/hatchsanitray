import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { PiFilePdfLight } from "react-icons/pi";
import React from "react";

export default function page() {
  return (
    <section className="flex justify-between gap-4 px-28 mt-10">
      <Sidebar />
      <main className="bg-white w-5/6 p-5">
        <div className="head flex justify-between items-center">
          <h1 className="text-2xl">New Proposal</h1>
          <Button
            className={"bg-sky-900 rounded-[4px] px-8 py-3 cursor-pointer"}
          >
            {" "}
            <PiFilePdfLight size={20} />
            Export to PDF
          </Button>
        </div>
        <div className="proposal-form"></div>
        <div className="selected-products"></div>
      </main>
    </section>
  );
}
