"use client";

import { useState, useId } from "react";
import { CheckCircle } from "lucide-react";

export default function UploadInput() {
  const [fileName, setFileName] = useState(null);
  const inputId = useId(); // <== يولّد ID فريد لكل نسخة من الكمبوننت

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-gray-100  hover:border-gray-400 rounded-md cursor-pointer bg-white hover:bg-gray-100 transition"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-12 h-12 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M16.5 12L12 7.5 7.5 12m4.5-4.5V18"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-400">PNG, JPG or JPEG (max. 5MB)</p>
        </div>
        <input
          id={inputId}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {fileName && (
        <div className="flex items-center gap-2 mt-4 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{fileName}</span>
        </div>
      )}
    </div>
  );
}
