"use client";
import React, { useEffect, useState } from "react";
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
import { TiDeleteOutline } from "react-icons/ti";

export default function MainProposalPage() {
  const [title, setTitle] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [projectLogo, setProjectLogo] = React.useState(null);
  const [clientLogo, setClientLogo] = React.useState(null);
  const [customerphone, setCustomerPhone] = React.useState(null);
  const [customerAddress, setCustomerAddress] = React.useState(null);
  const [exportActive, setExportActive] = React.useState(false);
  const [activeSubmit, setActiveSubmit] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [grandTotalCheck, setGrandTotalCheck] = useState(false);

  // ====================================== Global State ======================================
  const addProposal = Proposals((state) => state.addProposal);
  const theProposalData = Proposals((state) => state.proposal);
  const ProposalsList = Proposals((state) => state.proposals);
  const ProductsList = Proposals((state) => state.products);
  const removeProduct = Proposals((state) => state.removeProduct);
  const [loading, setLoading] = React.useState(false);
  const [clientLogoUrl, setClientLogoUrl] = React.useState(null);
  const changeProductQuantity = Proposals(
    (state) => state.changeProductQuantity
  );
  const grandTotalCheck = Proposals((state) => state.grandTotalCheck);
  const checkGrandTotal = Proposals((state) => state.checkGrandTotal);
  // ====================================== Global State End ====================================

  console.log("All Proposals", ProposalsList);

  //========================================== Handlers ===================================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const formData = new FormData();

    formData.append("project_name", title);
    formData.append("project_logo", projectLogo);
    formData.append("client_logo", clientLogo);
    formData.append("client_name", clientName);
    formData.append("contact_name", "sdfsdfdfdsfdsfsdf");
    formData.append("contact_address", customerAddress);
    formData.append("contact_email", "customerEmail@gmail.com");
    formData.append("contact_phone", customerphone);
    console.log("this is our formData", formData);

    console.log(
      "this is project name from formData",
      formData.get("client_name")
    );
    console.log("this our api", process.env.NEXT_PUBLIC_API_URL);

    console.log("this is our state", Proposals.getState().proposals);
    // upload file in client

    console.log("this is our grand total checked", grandTotalCheck);

    try {
      setLoading(true);
      console.log(
        "this is our api",
        `${process.env.NEXT_PUBLIC_API_URL}proposals`
      );
      if ([...formData.entries()].length > 0) {
        console.log("this is our formData", [...formData.entries()]);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}proposals`, {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          cache: "no-store",
          body: formData,
        });
        const data = await res.json();
        console.log("this is our data", res);
        setLoading(false);
        addProposal({ ...data.data });
        setClientLogoUrl(data.data.client_logo);
        toast.success("Proposal added successfully");
        setExportActive(true);
        setActiveSubmit(false);
        console.log("this is our theProposalData", theProposalData);
      }
    } catch (err) {
      console.log("this is our error", err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // const PDFDownloader = dynamic(
  //   () => import("@/components/proposal/PdfDownloader.jsx"),
  //   {
  //     ssr: false,
  //   }
  // );

  const PdfMerger = dynamic(
    () => import("@/components/proposal/PdfMerger.jsx"),
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
  const handleProductQuantity = (id, qty) => {
    console.log("id", id, "qty", qty);
    if (!qty) return;
    changeProductQuantity(id, qty);
  };
  const handleDeleteProduct = (id) => {
    removeProduct(id);
    toast.warning("Product Delete successfully");
  };
  const handleClientLogoChange = (e) => {
    setClientLogo(e.target.files[0]);
  };

  const handleProjectLogoChange = (e) => {
    setProjectLogo(e.target.files[0]);
  };

  //========================================== Handlers End ===================================================

  useEffect(() => {
    if (activeSubmit) {
      handleFormSubmit();
    }
  }, [activeSubmit]);
  useEffect(() => {
    console.log("this is grand total checked", grandTotalCheck);
  }, [grandTotalCheck]);
  return (
    <main className="bg-white xl:w-full w-5/6 p-5">
      <div className="head flex justify-between items-center py-4">
        <h1 className="text-2xl">New Proposal</h1>

        {exportActive && (
          <div className="flex gap-3">
            {/* <PDFDownloader exportActive={exportActive} /> */}
            <PdfMerger />
          </div>
        )}
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
              name="title"
              placeholder="Proposal Title"
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-200 border p-3 rounded w-[100%] h-11"
            />
            <input
              type="text"
              placeholder="Client Name"
              name="clientName"
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

          <div className="form-grid grid grid-cols-2 gap-4">
            <input
              type="text"
              name="clientPhone"
              placeholder="Contact person Phone"
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="border-gray-200 border p-3 rounded w-[100%] h-11"
            />
            <input
              type="text"
              placeholder="Client Address"
              name="clientAddress"
              className="border-gray-200 border p-3 rounded w-[100%] h-11"
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>
          <div className="form-grid grid grid-cols-2 gap-4">
            <input
              type="text"
              name="ContactPersonName"
              placeholder="Contact Person Name"
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="border-gray-200 border p-3 rounded w-[100%] h-11"
            />
            <div className="flex items-center gap-4 justify-start">
              <label htmlFor="grandTotal"> Grand Total</label>
              <input
                id="grandTotal"
                type="checkbox"
                className="h-5 w-5 rounded-md accent-emerald-600 border border-emerald-400  focus:none focus:outline-none transition duration-150 ease-in-out"
                checked={grandTotalCheck}
                onChange={() => checkGrandTotal((prev) => !prev)}
              />
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
          <TableCaption>A list of your Selected Products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className="w-[100px]">Item Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ProductsList?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <TiDeleteOutline
                    size={20}
                    className="hover:text-red-400 text-gray-400 cursor-pointer"
                    onClick={() => handleDeleteProduct(product?.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product?.sku}</TableCell>
                <TableCell>{product?.localized_name}</TableCell>
                <TableCell>
                  {product?.price === null ? "0" : product?.price}
                </TableCell>
                <TableCell className="text-right">
                  <input
                    type="number"
                    value={product?.quantity ?? 0}
                    onChange={(e) =>
                      handleProductQuantity(product?.id, Number(e.target.value))
                    }
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                {ProductsList.reduce((acc, product) => {
                  const quantity = product.quantity ?? 1;
                  const price = Number(product.price ?? 0);
                  return acc + price * quantity;
                }, 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
