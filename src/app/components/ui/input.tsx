import * as React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="border border-gray-600 bg-gray-700 text-gray-100 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
