"use client";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProposalPdfDoc from "@/components/proposal/ProposalPdfDoc";
import { Proposals } from "@/store/proposals-store";
import { PiFilePdfLight } from "react-icons/pi";

export default function PdfDownloader() {
  return (
    <>
      <PDFDownloadLink
        disabled={true}
        className="flex  text-white justify-center items-center gap-3 bg-sky-900 rounded-[4px] px-8 py-3 cursor-pointer"
        document={
          <ProposalPdfDoc
            proposalName={Proposals.getState().proposals[0]?.proposalName}
            clientName={Proposals.getState().proposals[0]?.clientName}
          />
        }
        fileName="proposal_2.pdf"
      >
        <PiFilePdfLight size={20} />
        Export to PDF
      </PDFDownloadLink>
    </>
  );
}
