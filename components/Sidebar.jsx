import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { MdKeyboardArrowDown } from "react-icons/md";

import Link from "next/link";
import { Button } from "./ui/button";

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
      <aside className="xl:w-[28%] w-full shadow-xs bg-white px-6 py-4 rounded">
        <div className="flex justify-center">
          <Image src="/images/logo.gif" width={100} height={100} alt="logo" />
        </div>
        <Sheet className="block lg:hidden ">
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="hidden xl:block">
          <h3 className=" text-sm font-bold uppercase ">MAIN</h3>
          <ul className="text-[15px] flex flex-col gap-2 mt-2 text-gray-500">
            <Link
              href="/home"
              className="active  bg-blue-100 text-sky-800 bg-opacity-50 rounded-sm p-2"
            >
              Dashboard
            </Link>
            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-3 "
            >
              {categories?.data?.map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className=" border-gray-200 flex justify-start items-center">
                    <MdKeyboardArrowDown size={20} />
                    <h3 className="text-[13px] "> {category.name}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="flex justify-start flex-col pl-5 mt-2 items-start">
                    {category?.sub_categories?.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        href={`/category/${subCategory.id}`}
                      >
                        {subCategory.name}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ul>
        </div>
      </aside>
    </>
  );
}
