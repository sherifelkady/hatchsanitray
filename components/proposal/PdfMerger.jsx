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
      // 1. توليد ملف PDF من react-pdf
      const generatedPdfBlob = await pdf(
        <ProposalPdfDoc proposal={proposal} products={products} />
      ).toBlob();
      const generatedPdfBytes = await generatedPdfBlob.arrayBuffer();

      // 2. استخراج كل روابط الـ attachments من المنتجات
      const pdfUrls = products
        .flatMap((product) => product.attachments || [])
        .map((attachment) => attachment.url)
        .filter(Boolean); // يستبعد null / undefined

      // 3. إنشاء مستند جديد
      const mergedPdf = await PDFDocument.create();

      // 4. أضف صفحات الملف المولّد أولاً
      const generatedPdf = await PDFDocument.load(generatedPdfBytes);
      const generatedPages = await mergedPdf.copyPages(
        generatedPdf,
        generatedPdf.getPageIndices()
      );
      generatedPages.forEach((page) => mergedPdf.addPage(page));

      // 5. أضف صفحات كل ملفات الـ attachments
      for (const url of pdfUrls) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          const blob = await res.blob();
          const bytes = await blob.arrayBuffer();
          const doc = await PDFDocument.load(bytes);
          const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          pages.forEach((page) => mergedPdf.addPage(page));
        } catch (error) {
          console.warn("فشل تحميل PDF من:", url, error);
        }
      }

      // 6. حفظ الـ PDF المدموج
      const mergedPdfBytes = await mergedPdf.save();

      // 7. تحميله
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
