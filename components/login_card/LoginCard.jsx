import React from "react";

export default function LoginCard() {
  return (
    <div className="  ">
      <form className="flex flex-col gap-4 w-[600px] bg-gray-800 justify-center items-center py-25 text-white rounded opacity-90">
        <input
          type="text"
          placeholder="Email"
          className="border-gray-200 border p-3 rounded w-[70%]"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-gray-200 border p-3 rounded w-[70%]"
        />
        <div className="flex gap-2 w-[70%]">
          <button className="border-gray-200 border p-3 rounded w-[90%] cursor-pointer ">
            Login
          </button>
          <button className="border-gray-200 border p-3 rounded w-[90%] cursor-pointer">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
