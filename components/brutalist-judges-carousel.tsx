"use client";

import React from "react";
import { BrutalistJudgeCard } from "./brutalist-judge-card";
import { motion } from "framer-motion";

interface Judge {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  x?: string;
  linkedin?: string;
}

interface BrutalistJudgesCarouselProps {
  judges: Judge[];
  className?: string;
}

function ComingSoonJudgeCard({ index }: { index: number }) {
  return (
    <motion.div
      className='relative overflow-hidden rounded-xl shadow-xl border-4 border-green-500 bg-black flex flex-col items-center justify-end min-h-[420px] min-w-[340px] max-w-[420px] aspect-square'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ y: [0, -10, 0, 10, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: index * 0.1,
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-10 backdrop-blur-sm' />
      <div className='flex flex-col items-center justify-center h-full w-full z-20'>
        <span className='text-4xl font-black uppercase text-green-500 mb-2'>
          Coming Soon
        </span>
        <span className='text-white/60 font-mono'>Jury Reveal</span>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
  hover: {
    scale: 1.04,
    boxShadow: "0 0 24px #25D36655",
    transition: { duration: 0.2 },
  },
};

export function BrutalistJudgesCarousel({
  judges,
  className = "",
}: BrutalistJudgesCarouselProps) {
  // Always show 6 cards
  const cards = [
    ...judges,
    ...Array(Math.max(0, 6 - judges.length)).fill(null),
  ];

  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10 ${className}`}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {cards.map((judge, idx) =>
        judge ? (
          <motion.div
            key={judge.id}
            variants={cardVariants}
            whileHover='hover'
            transition={{ layout: { duration: 0.3 } }}
            layout
          >
            <BrutalistJudgeCard
              name={judge.name}
              title={judge.title}
              bio={judge.bio}
              image={judge.image}
              index={idx}
              x={judge.x}
              linkedin={judge.linkedin}
            />
          </motion.div>
        ) : (
          <ComingSoonJudgeCard key={`coming-soon-${idx}`} index={idx} />
        )
      )}
    </motion.div>
  );
}
