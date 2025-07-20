"use client";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProposalPdfDoc from "@/components/proposal/ProposalPdfDoc";
import { Proposals } from "@/store/proposals-store";
import { PiFilePdfLight } from "react-icons/pi";

export default function PdfDownloader() {
  const proposal = Proposals((state) => state.proposal);
  console.log("this is our proposal", proposal);
  return (
    <>
      <PDFDownloadLink
        className="flex  text-white justify-center items-center gap-3 bg-gray-700 rounded-[4px] px-8 py-3 cursor-pointer hover:bg-slate-700"
        document={
          <ProposalPdfDoc
            proposal={proposal}
            // proposalName={Proposals.getState().proposals[0]?.project_name}
            // clientName={Proposals.getState().proposals[0]?.client_name}
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
