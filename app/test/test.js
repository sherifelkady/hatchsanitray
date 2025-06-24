"use client";
import React from "react";
import { Proposals } from "@/store/proposals-store";
import { Button } from "@/components/ui/button";

export default function Test() {
  const { proposals, setProposal } = Proposals((state) => state);
  console.log("this is proposals", proposals);
  return (
    <>
      <Button
        onClick={() => setProposal({ theme: "dark" })}
        className="p-2 rounded bg-gray-900"
      >
        Click Here
      </Button>
      <div>
        {proposals?.map((proposal, index) => (
          <p key={index}>{proposal.theme}</p>
        ))}
      </div>
    </>
  );
}
