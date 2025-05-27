"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCounter } from "@/hooks/use-counter";
import { useInView } from "framer-motion";
import { ConfettiExplosion } from "./confetti-explosion";

interface BrutalistPrizeCardProps {
  title: string;
  amount: string;
  description: string;
  category: string;
  index: number;
  highlight?: boolean;
  color?: "gold" | "silver" | "green";
}

export function BrutalistPrizeCard({
  title,
  amount,
  description,
  category,
  index,
  highlight = false,
  color = "green",
}: BrutalistPrizeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Parse the amount to get the numeric value
  const parseAmount = (
    amount: string
  ): {
    prefix: string;
    numericValue: number | null;
    suffix: string;
  } => {
    // Handle special case for "PRICELESS"
    if (amount === "PRICELESS") {
      return { prefix: "", numericValue: null, suffix: "PRICELESS" };
    }

    // Extract numeric part from strings like "$25,000" or "$5,000 EACH"
    const match = amount.match(/(\$?)(\d+(?:,\d+)*)(\s+.*)?/);

    if (match) {
      const [, prefix, numericPart, suffix = ""] = match;
      // Remove commas and convert to number
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

  // Counter hook for animation
  const { formattedCount, isComplete } = useCounter({
    end: numericValue || 0,
    start: 0,
    duration: 2000,
    delay: index * 200,
    formatter: formatNumber,
  });

  // Start animation when card is in view
  useEffect(() => {
    if (isInView && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [isInView, shouldAnimate]);

  // Trigger confetti when counter completes
  useEffect(() => {
    if (isComplete && shouldAnimate && numericValue !== null) {
      setShowConfetti(true);
    }
  }, [isComplete, shouldAnimate, numericValue]);

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

  return (
    <motion.div
      className='relative'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      ref={cardRef}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <ConfettiExplosion
          active={showConfetti}
          particleCount={30 + (highlight ? 20 : 0)}
          width={cardRef.current?.offsetWidth || 300}
          height={cardRef.current?.offsetHeight || 200}
          onComplete={() => setShowConfetti(false)}
        />
      )}

      <div
        className={`group bg-black border-l-8 ${borderColor} hover:border-l-[16px] transition-all duration-300 
          ${
            highlight
              ? `border-t-4 border-r-4 border-b-4 ${borderColor}/30`
              : ""
          }`}
      >
        {/* Animated corner decorations */}
        <motion.div
          className={`absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 ${borderColor} opacity-0`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
        />

        <motion.div
          className={`absolute bottom-0 left-0 w-12 h-12 border-r-2 border-t-2 ${borderColor} opacity-0`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        />

        {/* Animated background pulse effect */}
        <div
          className={`absolute inset-0 ${color === "gold" ? "bg-yellow-400/10" : color === "silver" ? "bg-gray-300/10" : "bg-green-500/5"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Animated background line */}
        <motion.div
          className={`absolute h-[1px] ${color === "gold" ? "bg-yellow-400/30" : color === "silver" ? "bg-gray-300/30" : "bg-green-500/30"} left-0 right-0`}
          style={{ top: "50%" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.7 }}
        />

        <div className='p-6 relative'>
          {/* Title with reveal animation */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.1, duration: 0.5 }}
          >
            <h4 className='text-3xl font-black uppercase text-white mb-2 group-hover:text-green-500 transition-colors duration-300'>
              {title}
            </h4>
          </motion.div>

          {/* Amount with counter animation */}
          <div className='mb-4 overflow-hidden'>
            <div className='flex items-center'>
              {category !== "Special" && (
                <div className={`text-5xl font-black ${textColor}`}>
                  {numericValue !== null ? (
                    <>
                      <span className='inline-block'>{prefix}</span>
                      <span className='inline-block'>
                        {formatNumber(numericValue)}
                      </span>
                      <span className='inline-block'>{suffix}</span>
                    </>
                  ) : (
                    <span>{amount}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description with reveal animation */}
          {category === "Special" && (
            <motion.p
              className='text-white/80 font-mono relative z-10'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Animated highlight effect for hover */}
        <div className='absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />

        {/* Animated corner flash */}
        <motion.div
          className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/20 to-transparent'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.15 + 0.6, duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
