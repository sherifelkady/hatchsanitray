import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { PiFilePdfLight } from "react-icons/pi";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import UploadInput from "@/components/ui/UploadInput";
import MainProposalPage from "@/components/proposal/MainProposalPage";
import TopBar from "@/components/TopBar";

export default function page() {
  return (
    <section className="flex justify-between gap-4 px-15 mt-10">
      <Sidebar />
      <section className="flex-col gap-4 xl:w-[82%] w-full">
        {/* <StaticsCard /> */}
        <TopBar />
        <MainProposalPage />;
      </section>
    </section>
  );
}
