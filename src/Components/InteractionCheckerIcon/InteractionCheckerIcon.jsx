/*eslint-disable*/
import React from "react";

export default function InteractionCheckerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="65"
      height="65"
      fill="none"
      stroke="#0c1467"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
  
  {/* main circle */}
      <circle cx="32" cy="32" r="29" stroke="#0c1467" />

      {/* pill */}
      <rect x="22" y="28" width="20" height="9" rx="4" stroke="#0c1467" />
      <line x1="32" y1="28" x2="32" y2="36" stroke="#0c1467" strokeWidth="3" />

{/* true */}
      <circle cx="12" cy="12" r="10" stroke="#0c1467" fill="white" />
      <path d="M10 12l2 2 3-3" stroke="#0c1467" strokeWidth="3" />

{/* false */}
      <circle cx="52" cy="52" r="10" stroke="#0c1467" fill="white" />
      <path d="M50 50l4 4M54 50l-4 4" stroke="#0c1467" strokeWidth="3" />
    </svg>
  );
}
