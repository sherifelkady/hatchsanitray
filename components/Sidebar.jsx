import React from "react";
import SideBarContent from "./SideBarContent";

export default async function Sidebar() {
  // ===================== get Categories ====================================
  const API = process.env.API_URL;
  console.log("API URL:", process.env.API_URL);
  const categoriesData = await fetch(`${API}categories?lang=en`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const categories = await categoriesData.json();

  // ===================== get Categories End ================================

  return (
    <>
      <SideBarContent categories={categories} />
    </>
  );
}
