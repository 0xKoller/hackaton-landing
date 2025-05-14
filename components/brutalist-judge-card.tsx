"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X, Linkedin } from "lucide-react";

interface BrutalistJudgeCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  index: number;
  x?: string;
  linkedin?: string;
  position?: string;
}

export function BrutalistJudgeCard({
  name,
  title,
  bio,
  image,
  index,
  x,
  linkedin,
  position,
}: BrutalistJudgeCardProps) {
  return (
    <motion.div
      className='relative'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className='group relative overflow-hidden rounded-xl shadow-xl border-4 border-green-500 bg-black'
        style={{ minHeight: 420, minWidth: 340, maxWidth: 420 }}
      >
        {/* Judge image covers the whole card */}
        <div className='absolute inset-0 w-full h-full z-0'>
          <Image
            src={image || "/placeholder.svg?height=500&width=500"}
            alt={name}
            fill
            className='object-cover w-full h-full transition-all duration-700 filter grayscale group-hover:filter-none'
            sizes='(max-width: 420px) 100vw, 420px'
          />
          <div className='absolute inset-0 bg-black/0 transition-colors duration-500' />
        </div>

        {/* Content overlays */}
        <div className='hidden  md:flex absolute bottom-0 left-0 right-0 z-20 p-4'>
          <div className='bg-green-500 inline-block px-4 py-2 mb-2 rounded transition-all duration-300 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:pointer-events-none'>
            <h3 className='text-3xl font-black uppercase text-black text-center'>
              {name}
            </h3>
          </div>
        </div>

        {/* Extra info overlay on hover */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute left-0 right-0 bottom-0 z-30 p-6  opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto pointer-events-none transition-all duration-300 rounded-b-lg  overflow-visible'
        >
          {/* Gradient fade at the top for smooth blending */}
          <div className='absolute left-0 right-0 top-0 h-[170px] bg-gradient-to-t from-black/70 to-transparent pointer-events-none rounded-t-lg  ' />
          <div className='mb-4 relative z-10'>
            <h4 className='text-xl font-bold text-green-500'>{title}</h4>
            <p className='text-white/80 font-mono text-sm mt-2'>{bio}</p>
          </div>
          <div className='flex gap-4 relative z-10'>
            {linkedin && (
              <a
                href={linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-green-500 hover:text-white transition-colors'
              >
                <Linkedin size={28} />
              </a>
            )}
            {x && (
              <a
                href={x}
                target='_blank'
                rel='noopener noreferrer'
                className='text-green-500 hover:text-white transition-colors'
              >
                <X size={28} />
              </a>
            )}
          </div>
        </motion.div>

        <div className='flex items-end justify-evenly sm:hidden absolute bottom-0 left-0 right-0 z-20 p-4'>
          <div className='bg-green-500 inline-block w-fit max-w-2/3 px-3 py-1 mb-1 rounded transition-all duration-300 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:pointer-events-none text-left'>
            <h3 className='text-lg font-black uppercase text-black'>{title}</h3>
            <h4 className='text-xs font-mono text-white/80'>{position}</h4>
          </div>
          <div className=' inline-block py-2 mb-2 w-1/3 rounded transition-all duration-300 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:pointer-events-none'>
            <div className='flex justify-end gap-4'>
              {linkedin && (
                <a href={linkedin} target='_blank' rel='noopener noreferrer'>
                  <Linkedin size={28} />
                </a>
              )}
              {x && (
                <a href={x} target='_blank' rel='noopener noreferrer'>
                  <X size={28} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
