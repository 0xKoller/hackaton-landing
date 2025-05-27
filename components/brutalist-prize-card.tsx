"use client";

import { useRef, useState, useEffect } from "react";

interface BrutalistPrizeCardProps {
  title: string;
  amount: string;
  description: string;
  category: string;
  index: number;
  highlight?: boolean;
  color?: "gold" | "silver" | "green";
  noCounter?: boolean;
  special?: boolean;
}

export function BrutalistPrizeCard({
  title,
  amount,
  description,
  category,
  index,
  highlight = false,
  color = "green",
  noCounter = false,
  special = false,
}: BrutalistPrizeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Color classes
  const borderColor =
    color === "gold"
      ? "border-yellow-400 hover:border-yellow-300"
      : color === "silver"
        ? "border-gray-300 hover:border-gray-200"
        : "border-green-500 hover:border-green-400";
  const textColor =
    color === "gold"
      ? "text-yellow-400 group-hover:text-yellow-300"
      : color === "silver"
        ? "text-gray-300 group-hover:text-gray-200"
        : "text-green-500 group-hover:text-green-400";

  // Parse the amount to get the numeric value
  const parseAmount = (
    amount: string
  ): {
    prefix: string;
    numericValue: number | null;
    suffix: string;
  } => {
    if (amount === "PRICELESS") {
      return { prefix: "", numericValue: null, suffix: "PRICELESS" };
    }
    const match = amount.match(/(\$?)(\d+(?:,\d+)*)(\s+.*)?/);
    if (match) {
      const [, prefix, numericPart, suffix = ""] = match;
      const numericValue = Number.parseInt(numericPart.replace(/,/g, ""));
      return { prefix, numericValue, suffix };
    }
    return { prefix: "", numericValue: null, suffix: amount };
  };
  const { prefix, numericValue, suffix } = parseAmount(amount);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className='relative'>
      <div
        className={`group bg-black border-l-8 ${borderColor} hover:border-l-[16px] transition-all duration-300 
          ${
            highlight
              ? `border-t-4 border-r-4 border-b-4 ${borderColor}/30`
              : ""
          }`}
      >
        {/* Static corner decorations */}
        <div
          className={`absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 ${borderColor}`}
        />
        <div
          className={`absolute bottom-0 left-0 w-12 h-12 border-r-2 border-t-2 ${borderColor}`}
        />
        {/* Static background pulse effect */}
        <div
          className={`absolute inset-0 ${color === "gold" ? "bg-yellow-400/10" : color === "silver" ? "bg-gray-300/10" : "bg-green-500/5"}`}
        />
        {/* Static background line */}
        <div
          className={`absolute h-[1px] ${color === "gold" ? "bg-yellow-400/30" : color === "silver" ? "bg-gray-300/30" : "bg-green-500/30"} left-0 right-0`}
          style={{ top: "50%" }}
        />
        <div className='p-6 relative'>
          {/* Title */}
          <h4 className='text-3xl font-black uppercase text-white mb-2'>
            {title}
          </h4>
          {/* Special prize icon */}

          {/* Amount (static) */}
          <div className='mb-4 overflow-hidden'>
            <div className='flex items-center justify-center'>
              <span className={`text-5xl font-black ${textColor}`}>
                {amount}
              </span>
            </div>
          </div>
          {category === "Special" && (
            <p className='text-white/80 font-mono relative z-10'>
              {description}
            </p>
          )}
        </div>
        {/* Static highlight effect for hover */}
        <div className='absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
      </div>
    </div>
  );
}
