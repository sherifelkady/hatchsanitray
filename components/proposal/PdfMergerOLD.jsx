"use client";
import React from "react";
import { pdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import ProposalPdfDoc from "@/components/proposal/ProposalPdfDoc";
import { Proposals } from "@/store/proposals-store";
import { PiFilePdfLight } from "react-icons/pi";

export default function PdfMerger() {
  const proposal = Proposals((state) => state.proposal);
  const products = Proposals((state) => state.products);
  const [isLoading, setIsLoading] = React.useState(false);

  const mergePdfs = async () => {
    setIsLoading(true);
    try {
      // إنشاء PDF من react-pdf
      const generatedPdfBlob = await pdf(
        <ProposalPdfDoc proposal={proposal} products={products} />
      ).toBlob();

      // قراءة الملف الموجود
      const existingPdfResponse = await fetch(
        "https://hatchsanitary.com//storage/product-attachments/HAT-AVE014/01JGXE5RE3JBGH728JBHRD4Y6J.pdf",
        {
          cache: "no-store",
        }
      );
      const existingPdfBlob = await existingPdfResponse.blob();

      // تحويل البيانات إلى ArrayBuffer
      const generatedPdfBytes = await generatedPdfBlob.arrayBuffer();
      const existingPdfBytes = await existingPdfBlob.arrayBuffer();

      // إنشاء مستندات PDF جديدة
      // إنشاء مستندات PDF جديدة
      const mergedPdf = await PDFDocument.create();

      // ✅ أضف PDF المُولد أولاً
      const generatedPdf = await PDFDocument.load(generatedPdfBytes);
      const generatedPages = await mergedPdf.copyPages(
        generatedPdf,
        generatedPdf.getPageIndices()
      );
      generatedPages.forEach((page) => mergedPdf.addPage(page));

      // ✅ أضف PDF الموجود في public بعده
      const existingPdf = await PDFDocument.load(existingPdfBytes);
      const existingPages = await mergedPdf.copyPages(
        existingPdf,
        existingPdf.getPageIndices()
      );
      existingPages.forEach((page) => mergedPdf.addPage(page));

      // حفظ PDF المدموج
      const mergedPdfBytes = await mergedPdf.save();

      // تحميل الملف
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged_proposal.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("حدث خطأ أثناء دمج ملفات PDF: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={mergePdfs}
      disabled={isLoading}
      className={`flex text-white justify-center items-center gap-3 rounded-[4px] px-8 py-3 cursor-pointer ${
        isLoading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-700 hover:bg-blue-800"
      }`}
    >
      <PiFilePdfLight size={20} />
      {isLoading ? "Merging PDFs..." : "Export Merged PDF"}
    </button>
  );
}
