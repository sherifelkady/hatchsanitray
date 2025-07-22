"use client";
import React, { useEffect } from "react";
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
import { toast } from "sonner";
import Image from "next/image";

export default function MainProposalPage() {
  const [title, setTitle] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [projectLogo, setProjectLogo] = React.useState(null);
  const [clientLogo, setClientLogo] = React.useState(null);
  const [exportActive, setExportActive] = React.useState(false);
  const [activeSubmit, setActiveSubmit] = React.useState(false);
  const addProposal = Proposals((state) => state.addProposal);
  const theProposalData = Proposals((state) => state.proposal);
  const ProposalsList = Proposals((state) => state.proposals);
  const [loading, setLoading] = React.useState(false);
  const [clientLogoUrl, setClientLogoUrl] = React.useState(null);
  console.log("All Proposals", ProposalsList);

  //========================================== Handlers ===================================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    console.log("this is our state", Proposals.getState().proposals);
    // upload file in client
    const formData = new FormData();
    formData.append("project_name", title);
    formData.append("client_name", clientName);
    formData.append("project_logo", projectLogo);
    formData.append("client_logo", clientLogo);
    console.log("this is our formData", formData);
    console.log("this our api", process.env.NEXT_PUBLIC_API_URL);

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}proposals`, {
        method: "POST",
        mode: "cors",
        cache: "no-store",
        body: formData,
      });
      const data = await res.json();
      console.log("this is our data", data);
      setLoading(false);
      addProposal({ ...data.data });
      setClientLogoUrl(data.data.client_logo);
      toast.success("Proposal added successfully");
      setExportActive(true);
      setActiveSubmit(false);
      console.log("this is our theProposalData", theProposalData);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const PDFDownloader = dynamic(
    () => import("@/components/proposal/PdfDownloader.jsx"),
    {
      ssr: false,
    }
  );

  // === handle image selection ===

  const handleProjectLogo = (file) => {
    setProjectLogo(file);
  };
  const handleClientLogo = (file) => {
    setClientLogo(file);
  };
  const handleClientLogoChange = (e) => {
    setClientLogo(e.target.files[0]);
  };

  const handleProjectLogoChange = (e) => {
    setProjectLogo(e.target.files[0]);
  };
  const handleSubmit = () => {
    setActiveSubmit(true);
  };
  //========================================== Handlers End ===================================================

  useEffect(() => {
    if (activeSubmit) {
      handleFormSubmit();
    }
  }, [activeSubmit]);
  return (
    <main className="bg-white xl:w-full w-5/6 p-5">
      <div className="head flex justify-between items-center py-4">
        <h1 className="text-2xl">New Proposal</h1>

        {exportActive && <PDFDownloader exportActive={exportActive} />}
      </div>
      {/* ================= Form ================= */}
      <div className="proposal-form">
        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-4 justify-center w-full"
        >
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
              {/* <input type="file" onChange={handleProjectLogoChange} /> */}
              <UploadInput handleFile={handleProjectLogo} />
            </div>
            <div className="flex flex-col gap-3">
              <h4>Client Logo</h4>
              {/* <UploadInput /> */}
              <UploadInput handleFile={handleClientLogo} />
            </div>
          </div>
          <Button
            className={"bg-gray-600 rounded-[4px]  px-8 py-3 cursor-pointer "}
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Proposal"}
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
