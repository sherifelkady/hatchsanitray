import ProposalsUserList from "@/components/proposal/ProposalsUserList";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Proposals } from "@/store/proposals-store";
import React from "react";

export default function page() {
  return (
    <section className="flex justify-between gap-4 px-15 mt-10">
      <Sidebar />
      <section className="flex-col gap-4 xl:w-[82%] w-full">
        {/* <StaticsCard /> */}
        <TopBar />
        <ProposalsUserList />
      </section>
    </section>
  );
}
