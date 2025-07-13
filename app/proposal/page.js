"use client";
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
import MainProposalPage from "@/components/proposal/MainProposalPage";

export default function page() {
  return <MainProposalPage />;
}
