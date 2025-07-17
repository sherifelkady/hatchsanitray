"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
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
import UploadInput from "@/components/ui/UploadInput";
import { Proposals } from "@/store/proposals-store";
import dynamic from "next/dynamic";

export default function MainProposalPage() {
  const [title, setTitle] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [projectLogo, setProjectLogo] = React.useState(null);
  const [companyLogo, setCompanyLogo] = React.useState(null);
  const [exportActive, setExportActive] = React.useState(false);
  const addProposal = Proposals((state) => state.addProposal);

  //========================================== Handlers ===================================================
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addProposal({ proposalName: title, clientName: clientName });
    console.log("this is our state", Proposals.getState().proposals);
    // upload file in client
    const formData = new FormData();
    formData.append("file", companyLogo);
    console.log("this is our formData", formData.getAll("file"));
    setExportActive(true);
    setTitle("");
    setClientName("");
  };

  const PDFDownloader = dynamic(
    () => import("@/components/proposal/PdfDownloader.jsx"),
    {
      ssr: false,
    }
  );
  //========================================== Handlers End ===================================================
  return (
    <main className="bg-white w-5/6 p-5">
      <div className="head flex justify-between items-center py-4">
        <h1 className="text-2xl">New Proposal</h1>

        <PDFDownloader />
      </div>
      {/* ================= Form ================= */}
      <div className="proposal-form">
        <form className="flex flex-col gap-4 justify-center w-full">
          <h4 className="text-lg">Project Details</h4>
          <div className="form-grid grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Proposal Title"
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-200 border p-3 rounded w-[100%] h-11"
            />
            <input
              type="text"
              placeholder="Client Name"
              className="border-gray-200 border p-3 rounded w-[100%] h-11"
              onChange={(e) => setClientName(e.target.value)}
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
          <Button
            className={"bg-sky-900 rounded-[4px]  px-8 py-3 cursor-pointer "}
            onClick={(e) => handleFormSubmit(e)}
          >
            {" "}
            Save Proposal
          </Button>
        </form>
      </div>
      <div className="selected-products mt-10 flex flex-col gap-4">
        <h4 className="text-lg">Selected Products</h4>
        {/* ======================================================= Selected Products ================================== */}
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
  );
}
