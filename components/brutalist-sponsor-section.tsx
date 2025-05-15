import Image from "next/image";
import { motion } from "framer-motion";

export type Sponsor = {
  name: string;
  logo: string; // path to logo in public/ or external SVG url
  url: string;
};

const sponsors: Sponsor[] = [
  {
    name: "SquadS Ventures",
    logo: "https://squads.ventures/wp-content/uploads/2023/11/Logo.svg",
    url: "https://squads.ventures/",
  },
  // {
  //   name: "Vercel",
  //   logo: "/vercel.png",
  //   url: "https://vercel.com/",
  // },
  {
    name: "VoltChat",
    logo: "/volt.png",
    url: "https://www.voltchat.com/",
  },
  {
    name: "DeRecruiters",
    logo: "/deRecruiters.png",
    url: "https://www.derecruiters.com/",
  },
  {
    name: "HIT",
    logo: "/hit.png",
    url: "https://hitcowork.co/",
  },
  {
    name: "Darwin",
    logo: "https://cdn.prod.website-files.com/66dcd014322ea9965fa61f03/681b7d62588dff390cd99c73_Imagotipo.svg",
    url: "https://www.getdarwin.ai/",
  },
  {
    name: "Yalo",
    logo: "/yalo.png",
    url: "https://www.yalo.ai/",
  },
  {
    name: "The Network",
    logo: "/the-network.png",
    url: "https://www.thenetwork.com/",
  },
];

// Utility to check if logo is an external SVG
function isExternalSVG(url: string) {
  return url.startsWith("http") && url.endsWith(".svg");
}

export function BrutalistSponsorSection() {
  // Generate a random phase and sideways offset for each sponsor for organic movement
  const levitationConfigs = sponsors.map((_, i) => {
    // Randomize phase and sideways amplitude
    const phase = Math.random() * Math.PI * 2;
    const xAmplitude = Math.random() < 0.5 ? 0 : Math.random() * 8 + 4; // 0 or 4-12px
    const xDirection = Math.random() < 0.5 ? 1 : -1;
    return { phase, xAmplitude, xDirection };
  });

  return (
    <section className='bg-green-500 py-16 md:py-24 relative overflow-hidden'>
      <div className='absolute -left-20 top-0 text-[20rem] font-black text-black/10 select-none'>
        SPONSOR
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
            <div className='bg-black px-6 py-3 text-green-500'>
              <h2 className='text-6xl md:text-8xl font-black uppercase leading-none'>
                SPONSORS
              </h2>
            </div>
          </div>
        </motion.div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-12 items-center justify-center'>
          {sponsors.map((sponsor, idx) => {
            const { phase, xAmplitude, xDirection } = levitationConfigs[idx];
            return (
              <motion.a
                key={sponsor.name}
                href={sponsor.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex m-1 flex-col items-center justify-center relative group'
                whileHover={{ scale: 1.15, y: -10 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Tooltip */}
                <span className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-green-500 px-4 py-2 rounded font-mono text-sm font-bold z-20 shadow-lg border-2 border-green-500 brutalist-tooltip pointer-events-none'>
                  {sponsor.name}
                </span>
                <motion.div
                  animate={{
                    y: [0, -12, 0, 12, 0],
                    x: xAmplitude
                      ? [
                          0,
                          xAmplitude * xDirection,
                          0,
                          -xAmplitude * xDirection,
                          0,
                        ]
                      : 0,
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2, // 4-6s
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: phase, // randomize start
                  }}
                  style={{ display: "flex" }}
                >
                  {isExternalSVG(sponsor.logo) ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      style={{ maxWidth: 240 }}
                      className='object-contain h-[60px] md:h-[110px] w-auto filter-gray-monochrome hover:filter-none transition-transform duration-200'
                      loading='lazy'
                    />
                  ) : (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={240}
                      height={110}
                      className='object-contain h-[60px] md:h-[110px] w-auto filter-gray-monochrome hover:filter-none transition-transform duration-200'
                    />
                  )}
                </motion.div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
