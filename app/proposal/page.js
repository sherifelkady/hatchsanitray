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

export default function page() {
  return (
    <section className="flex justify-between gap-4 px-38 mt-10">
      <Sidebar />
      <main className="bg-white w-5/6 p-5">
        <div className="head flex justify-between items-center py-4">
          <h1 className="text-2xl">New Proposal</h1>
          <Button
            className={"bg-sky-900 rounded-[4px] px-8 py-3 cursor-pointer"}
          >
            {" "}
            <PiFilePdfLight size={20} />
            Export to PDF
          </Button>
        </div>
        {/* ================= Form ================= */}
        <div className="proposal-form">
          <form className="flex flex-col gap-4">
            <h4 className="text-lg">Project Details</h4>
            <div className="form-grid grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Proposal Title"
                className="border-gray-200 border p-3 rounded w-[100%] h-11"
              />
              <input
                type="text"
                placeholder="Client Name"
                className="border-gray-200 border p-3 rounded w-[100%] h-11"
              />
            </div>
            <h4 className="text-lg">Upload Fiels</h4>
            <div className="form-grid grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <h4>Project Logo</h4>
                <UploadInput />
              </div>
              <div className="flex flex-col gap-3">
                <h4>Company Logo</h4>
                <UploadInput />
              </div>
            </div>
          </form>
        </div>
        <div className="selected-products mt-10 flex flex-col gap-4">
          <h4 className="text-lg">Selected Products</h4>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </section>
  );
}
