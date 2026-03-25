import React from "react";

export default function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}