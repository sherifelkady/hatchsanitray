import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProposalsUserList() {
  return (
    <main className="w-full bg-[#f9fafb] grid gap-2 py-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-1 justify-between ">
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Accordion Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Accordion Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Accordion Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
