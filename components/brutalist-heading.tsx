"use client";

import type React from "react";

import { motion } from "framer-motion";

interface BrutalistHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function BrutalistHeading({
  children,
  className = "",
}: BrutalistHeadingProps) {
  return (
    <motion.h2
      className={`text-6xl md:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.h2>
  );
}
