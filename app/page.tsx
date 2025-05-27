"use client";
import { Button } from "@/components/ui/button";
import { BrutalistHeading } from "@/components/brutalist-heading";
import { BrutalistText } from "@/components/brutalist-text";
import { BrutalistEventDetail } from "@/components/brutalist-event-detail";
import { BrutalistComingSoon } from "@/components/brutalist-coming-soon";
import { BrutalistCountdown } from "@/components/brutalist-countdown";
import { BrutalistSponsorSection } from "@/components/brutalist-sponsor-section";
// import { BrutalistTimeline } from "@/components/brutalist-timeline";
import { motion, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Users, Trophy } from "lucide-react";
import { filteredJudges as judges } from "@/data/judges";
import { filteredMentors } from "@/data/mentors";
import { BrutalistJudgesCarousel } from "@/components/brutalist-judges-carousel";
import { prizes } from "@/data/prizes";
import { BrutalistPrizeCard } from "@/components/brutalist-prize-card";
import React from "react";

export default function LandingPage() {
  const prizesRef = useRef<HTMLDivElement>(null);

  // 8:00 AM ART (UTC-3) is 11:00 AM UTC
  const eventDate = new Date(Date.UTC(2025, 5, 7, 11, 0, 0));

  return (
    <div className='flex min-h-screen flex-col bg-black text-white'>
      {/* Hero Section with Countdown */}
      <section className='bg-zinc-950 py-16 relative overflow-hidden'>
        <div className='absolute -left-20 top-0 text-[20rem] font-black text-white/5 select-none'>
          24H
        </div>

        <div className='container mx-auto px-4'>
          <BrutalistCountdown
            targetDate={eventDate}
            className='max-w-4xl mx-auto'
          />

          <div className='flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size='lg'
                className='w-full sm:w-[250px] bg-green-400 text-black border border-green-400/50 px-8 py-6 text-xl'
                onClick={() => {
                  window.open("https://forms.gle/nELzhgfeXURg6D66A", "_blank");
                }}
              >
                <span className='relative z-10 font-bold'>
                  APPLY INDIVIDUALLY
                </span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size='lg'
                className='w-full sm:w-[250px] bg-green-400 text-black border border-green-400/50 px-8 py-6 text-xl'
                onClick={() => {
                  window.open("https://forms.gle/epRB14hsx3LnCYycA", "_blank");
                }}
              >
                <span className='relative z-10 font-bold'>APPLY WITH TEAM</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details Section - BRUTALIST REDESIGN */}
      <section className='bg-black py-16 md:py-24 relative overflow-hidden'>
        {/* Large background text */}
        <div className='absolute -right-20 top-0 text-[20rem] font-black text-white/5 select-none'>
          HACK
        </div>

        <div className='px-4 md:px-12 lg:px-24 relative z-10 max-w-[1800px] mx-auto'>
          {/* Brutalist heading */}
          <BrutalistHeading>
            <span className='block -mb-8'>ABOUT</span>
          </BrutalistHeading>

          <div className='mt-24 grid grid-cols-1 md:grid-cols-2 gap-24'>
            {/* Left column - Event overview */}
            <div>
              <BrutalistText className='mb-8'>
                Welcome to the first in-person event focused on building within
                the WhatsApp ecosystem — a platform with
                <span className='text-green-500 font-bold'>
                  {" "}
                  +3 billion users worldwide
                </span>
                . Whether through the Business API, Web WhatsApp Store or other
                APIs, you have a full day to ship tools that solve real problems
                on the most used communication channel on the planet.
              </BrutalistText>

              <BrutalistText delay={0.2} className='mb-8'>
                Apply as an individual or with a team (up to 4 people). Whether
                you&apos;re a{" "}
                <span className='text-green-500'>backend developer</span>,
                <span className='text-green-500'> React developer</span>,
                <span className='text-green-500'> product thinker</span>,
                <span className='text-green-500'> UI expert</span>, or
                <span className='text-green-500'> automation hacker</span> — you
                have a role to play here.
              </BrutalistText>
              <BrutalistText delay={0.4} className='mb-16'>
                The most impactful projects combine sharp tech execution with
                strong design and product insight. Build something bold and make
                your mark on the future of messaging.
              </BrutalistText>

              {/* Event details with brutalist styling and Lucide icons */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <BrutalistEventDetail
                  icon={
                    <Calendar
                      className='w-8 h-8 text-black'
                      strokeWidth={2.5}
                    />
                  }
                  title='DATE'
                  value='June 7th • 8am-8pm'
                  index={0}
                />

                <BrutalistEventDetail
                  icon={
                    <MapPin className='w-8 h-8 text-black' strokeWidth={2.5} />
                  }
                  title='LOCATION'
                  value='Buenos Aires (soon to be revealed)'
                  index={1}
                />

                <BrutalistEventDetail
                  icon={
                    <Users className='w-8 h-8 text-black' strokeWidth={2.5} />
                  }
                  title='FORMAT'
                  value='Individual & Teams'
                  index={2}
                />

                <BrutalistEventDetail
                  icon={
                    <Trophy className='w-8 h-8 text-black' strokeWidth={2.5} />
                  }
                  title='AWARDS'
                  value='Product, Business, Creativity'
                  index={3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section - 3 Columns by Category */}
      <section className='bg-black py-16 md:py-24 relative overflow-hidden'>
        <div className='px-4 md:px-12 lg:px-24 relative z-10 max-w-[1800px] mx-auto'>
          <motion.div
            className='mb-12 inline-block'
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className='bg-green-500 px-4 py-2 text-black relative overflow-hidden'>
              <motion.div
                className='absolute top-0 left-0 w-full h-full bg-black/10'
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
              />
              <h3 className='text-4xl font-black uppercase relative z-10'>
                AWARDS
              </h3>
            </div>
          </motion.div>

          {/* 3-column grid for categories */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16'>
            {["Technology", "Business Model", "Creativity"].map(
              (category, catIdx) => {
                const catPrizes = prizes.filter((p) => p.category === category);
                return (
                  <div key={category} className='flex flex-col items-center'>
                    <span className='text-green-500 text-xl font-black uppercase mb-6 tracking-widest'>
                      {category}
                    </span>
                    {catPrizes.map((prize, idx) => {
                      let color = "green";
                      if (prize.title === "1st place") color = "gold";
                      else if (prize.title === "2nd place") color = "silver";
                      return (
                        <div
                          key={prize.title + idx}
                          className='w-full max-w-[340px] mb-6'
                        >
                          <BrutalistPrizeCard
                            title={prize.title}
                            amount={prize.amount}
                            description={prize.description}
                            index={catIdx * 3 + idx}
                            highlight={prize.title === "1st place"}
                            color={color as "gold" | "silver" | "green"}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>

          {/* Special Prize */}
          {prizes
            .filter((p) => p.category === "Special")
            .map((prize, idx) => (
              <div
                key={prize.title}
                className='flex flex-col items-center mt-12 mb-4'
              >
                <span className='text-green-500 text-xl font-black uppercase mb-4 tracking-widest'>
                  Special Prize
                </span>
                <div className='w-full max-w-[380px]'>
                  <BrutalistPrizeCard
                    title={prize.title}
                    amount={prize.amount}
                    description={prize.description}
                    category={prize.category}
                    index={100 + idx}
                    highlight
                  />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Sponsor Section */}
      <BrutalistSponsorSection />

      {/* Timeline Section */}
      <section className='bg-zinc-950 py-16 md:py-24 relative overflow-hidden'>
        <div className='absolute -right-20 top-0 text-[20rem] font-black text-white/5 select-none'>
          TIME
        </div>

        <div className='px-4 md:px-12 lg:px-24 relative z-10 max-w-[1800px] mx-auto'>
          <motion.div
            className='mb-24'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className='inline-block'>
              <div className='bg-green-500 px-6 py-3 text-black'>
                <h2 className='text-6xl md:text-8xl font-black uppercase leading-none'>
                  TIMELINE
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Timeline Coming Soon (using 'judges' as placeholder type) */}
          <BrutalistComingSoon type='timeline' className='col-span-full' />
        </div>
      </section>

      {/* Judges Section - BRUTALIST REDESIGN */}
      <section className='bg-zinc-950 py-16 md:py-24 relative overflow-hidden'>
        {/* Large background text */}
        <div className='absolute -left-20 top-0 text-[20rem] font-black text-white/5 select-none'>
          JURY
        </div>

        <div className='px-4 md:px-12 lg:px-24 relative z-10 max-w-[1800px] mx-auto'>
          {/* Brutalist heading */}
          <motion.div
            className='mb-24'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className='inline-block'>
              <div className='bg-green-500 px-6 py-3 text-black'>
                <h2 className='text-6xl md:text-8xl font-black uppercase leading-none'>
                  JUDGES
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Judges FlagCarousel or Coming Soon */}
          <BrutalistJudgesCarousel judges={judges} />
          {/* <BrutalistComingSoon type='judges' className='col-span-full' /> */}
        </div>
      </section>

      {/* Mentors Section - BRUTALIST REDESIGN */}
      <section className='bg-black py-16 md:py-24 relative overflow-hidden'>
        {/* Large background text */}
        <div className='absolute -right-20 top-0 text-[20rem] font-black text-white/5 select-none'>
          HELP
        </div>

        <div className='px-4 md:px-12 lg:px-24 relative z-10 max-w-[1800px] mx-auto'>
          {/* Brutalist heading */}
          <motion.div
            className='mb-24'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className='inline-block'>
              <div className='bg-green-500 px-6 py-3 text-black'>
                <h2 className='text-6xl md:text-8xl font-black uppercase leading-none'>
                  MENTORS
                </h2>
              </div>
            </div>
            <div className='mt-6 max-w-2xl'>
              <BrutalistText>
                Get direct access to industry experts who will help you ship
                your code and push your technical implementation to the next
                level.
              </BrutalistText>
            </div>
          </motion.div>

          {/* Mentors FlagCarousel or Coming Soon */}
          <BrutalistJudgesCarousel judges={filteredMentors as any} />
        </div>
      </section>
    </div>
  );
}
