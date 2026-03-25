import React from "react";

export default function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}