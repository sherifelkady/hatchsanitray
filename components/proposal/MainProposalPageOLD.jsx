"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UploadInput from "@/components/ui/UploadInput";
import { Proposals } from "@/store/proposals-store";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { TiDeleteOutline } from "react-icons/ti";

// Dynamic imports
const PdfMerger = dynamic(() => import("@/components/proposal/PdfMerger.jsx"), {
  ssr: false,
});

// Form Actions
async function createProposalAction(formData) {
  const proposalData = {
    project_name: formData.get("title"),
    client_name: formData.get("clientName"),
    project_logo: formData.get("projectLogo"),
    client_logo: formData.get("clientLogo"),
    contact_name: formData.get("clientName"),
    contact_address: formData.get("customerAddress"),
    contact_email: formData.get("customerEmail") || "customerEmail@gmail.com",
    contact_phone: formData.get("customerPhone"),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}proposals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(proposalData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error creating proposal:", error);
    return { success: false, error: error.message };
  }
}

// Main Component
export default function MainProposalPage() {
  // State management
  const [formState, setFormState] = useState({
    title: "",
    clientName: "",
    customerPhone: "",
    customerAddress: "",
    customerEmail: "",
  });

  const [fileState, setFileState] = useState({
    projectLogo: null,
    clientLogo: null,
  });

  const [uiState, setUiState] = useState({
    exportActive: false,
    clientLogoUrl: null,
  });

  const [isPending, startTransition] = useTransition();

  // Global state
  const addProposal = Proposals((state) => state.addProposal);
  const theProposalData = Proposals((state) => state.proposal);
  const ProposalsList = Proposals((state) => state.proposals);
  const ProductsList = Proposals((state) => state.products);
  const removeProduct = Proposals((state) => state.removeProduct);
  const changeProductQuantity = Proposals(
    (state) => state.changeProductQuantity
  );

  // Event handlers
  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (fileType, file) => {
    setFileState((prev) => ({ ...prev, [fileType]: file }));
  };

  const handleProductQuantityChange = (id, quantity) => {
    if (!quantity) return;
    changeProductQuantity(id, quantity);
  };

  const handleProductDelete = (id) => {
    removeProduct(id);
    toast.warning("Product deleted successfully");
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formState.title.trim()) {
      toast.error("Please enter a proposal title");
      return;
    }

    const formData = new FormData(event.target);

    // Add file data to FormData
    if (fileState.projectLogo) {
      formData.set("projectLogo", fileState.projectLogo);
    }
    if (fileState.clientLogo) {
      formData.set("clientLogo", fileState.clientLogo);
    }

    startTransition(async () => {
      const result = await createProposalAction(formData);

      if (result.success) {
        addProposal(result.data);
        setUiState((prev) => ({
          ...prev,
          exportActive: true,
          clientLogoUrl: result.data.client_logo,
        }));
        toast.success("Proposal created successfully");

        // Reset form
        setFormState({
          title: "",
          clientName: "",
          customerPhone: "",
          customerAddress: "",
          customerEmail: "",
        });
        setFileState({
          projectLogo: null,
          clientLogo: null,
        });
      } else {
        toast.error(result.error || "Failed to create proposal");
      }
    });
  };

  // Calculate total price
  const totalPrice = ProductsList.reduce((total, product) => {
    const price = parseFloat(product.price) || 0;
    const quantity = product.quantity || 0;
    return total + price * quantity;
  }, 0);

  return (
    <main className="bg-white xl:w-full w-5/6 p-5">
      {/* Header */}
      <Header exportActive={uiState.exportActive} />

      {/* Proposal Form */}
      <ProposalForm
        formState={formState}
        fileState={fileState}
        isPending={isPending}
        onInputChange={handleInputChange}
        onFileUpload={handleFileUpload}
        onSubmit={handleSubmit}
      />

      {/* Selected Products Table */}
      <ProductsTable
        products={ProductsList}
        totalPrice={totalPrice}
        onQuantityChange={handleProductQuantityChange}
        onProductDelete={handleProductDelete}
      />
    </main>
  );
}

// Sub-components
function Header({ exportActive }) {
  return (
    <div className="head flex justify-between items-center py-4">
      <h1 className="text-2xl font-semibold">New Proposal</h1>
      {exportActive && (
        <div className="flex gap-3">
          <PdfMerger />
        </div>
      )}
    </div>
  );
}

function ProposalForm({
  formState,
  fileState,
  isPending,
  onInputChange,
  onFileUpload,
  onSubmit,
}) {
  return (
    <div className="proposal-form mb-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Project Details Section */}
        <section>
          <h4 className="text-lg font-medium mb-4">Project Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Proposal Title"
              value={formState.title}
              onChange={(e) => onInputChange("title", e.target.value)}
              className="border-gray-200 border p-3 rounded w-full h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={formState.clientName}
              onChange={(e) => onInputChange("clientName", e.target.value)}
              className="border-gray-200 border p-3 rounded w-full h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </section>

        {/* File Upload Section */}
        <section>
          <h4 className="text-lg font-medium mb-4">Upload Files</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Project Logo
              </label>
              <UploadInput
                handleFile={(file) => onFileUpload("projectLogo", file)}
                currentFile={fileState.projectLogo}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Client Logo
              </label>
              <UploadInput
                handleFile={(file) => onFileUpload("clientLogo", file)}
                currentFile={fileState.clientLogo}
              />
            </div>
          </div>
        </section>

        {/* Contact Details Section */}
        <section>
          <h4 className="text-lg font-medium mb-4">Contact Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="customerPhone"
              placeholder="Client Phone"
              value={formState.customerPhone}
              onChange={(e) => onInputChange("customerPhone", e.target.value)}
              className="border-gray-200 border p-3 rounded w-full h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              name="customerAddress"
              placeholder="Client Address"
              value={formState.customerAddress}
              onChange={(e) => onInputChange("customerAddress", e.target.value)}
              className="border-gray-200 border p-3 rounded w-full h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="mt-4">
            <input
              type="email"
              name="customerEmail"
              placeholder="Client Email"
              value={formState.customerEmail}
              onChange={(e) => onInputChange("customerEmail", e.target.value)}
              className="border-gray-200 border p-3 rounded w-full h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </section>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="bg-gray-600 hover:bg-gray-700 rounded px-8 py-3 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating Proposal..." : "Create Proposal"}
        </Button>
      </form>
    </div>
  );
}

function ProductsTable({
  products,
  totalPrice,
  onQuantityChange,
  onProductDelete,
}) {
  if (!products || products.length === 0) {
    return (
      <div className="selected-products mt-10">
        <h4 className="text-lg font-medium mb-4">Selected Products</h4>
        <div className="text-center py-8 text-gray-500">
          No products selected yet
        </div>
      </div>
    );
  }

  return (
    <div className="selected-products mt-10">
      <h4 className="text-lg font-medium mb-4">Selected Products</h4>
      <Table>
        <TableCaption>A list of your selected products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Actions</TableHead>
            <TableHead>Item Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const price = parseFloat(product.price) || 0;
            const quantity = product.quantity || 0;
            const itemTotal = price * quantity;

            return (
              <TableRow key={product.id}>
                <TableCell>
                  <button
                    onClick={() => onProductDelete(product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    type="button"
                  >
                    <TiDeleteOutline size={20} />
                  </button>
                </TableCell>
                <TableCell className="font-medium">
                  {product.sku || "N/A"}
                </TableCell>
                <TableCell>{product.localized_name || product.name}</TableCell>
                <TableCell>${price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) =>
                      onQuantityChange(
                        product.id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${itemTotal.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right font-semibold">
              Grand Total:
            </TableCell>
            <TableCell className="text-right font-bold text-lg">
              ${totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
