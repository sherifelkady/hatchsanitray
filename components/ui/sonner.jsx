"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 border px-4 py-2 rounded-md shadow-md font-medium",

          success: "bg-green-100 text-green-800 border-green-300",
          error: "bg-red-100 text-red-800 border-red-300",
        },
      }}
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
