export const mentors = [
  {
    id: "florencia_rosental",
    name: "Florencia Rosental",
    title: "Florencia Rosental",
    position: "Head of Engineering @ Litebox",
    image: "/mentors/florencia.jpeg",
    bio: "Expert in messaging platforms and scalable systems.",
    x: "https://x.com/Flor_Rosen",
    linkedin: "https://www.linkedin.com/in/florenciarosental/",
    availableDate: "2025-05-21",
  },
  {
    id: "federico_lombardozi",
    name: "Federico Lombardozzi",
    title: "Federico Lombardozzi",
    position: "SWE @ Volt",
    image: "/mentors/federico.jpeg",
    bio: "Open source contributor and web technologies expert.",
    x: "https://x.com/lombarrr",
    linkedin: "https://www.linkedin.com/in/federicolombardozzi/",
    availableDate: "2025-05-22",
  },
  {
    id: "goncy",
    name: "Gonzalo Pozzo",
    title: "Gonzalo Pozzo",
    position: "Senior Solutions Engineer @ Vercel",
    image: "/mentors/goncy.jpg",
    bio: "Senior ML engineer specializing in fine-tuning large language models for conversational AI with 8+ years at Google AI.",
    x: "https://x.com/goncy",
    linkedin: "https://www.linkedin.com/in/gonzalopozzo/",
    availableDate: "2025-05-24",
  },
  {
    id: "santiago_vilar",
    name: "Santiago Vilar",
    title: "Santiago Vilar",
    position: "SWE @ Volt",
    image: "/mentors/santiago.jpeg",
    bio: "Technical lead who helped build WhatsApp's Business API. Expert in high-throughput messaging systems and real-time data processing.",
    // x: "https://x.com/santiago_vilar",
    linkedin: "https://www.linkedin.com/in/santiagovilar/",
    availableDate: "2025-05-26",
  },
  {
    id: "matias_carpintini",
    name: "Matias Carpintini",
    title: "Matias Carpintini",
    position: "SWE @ Volt",
    image: "/mentors/matias.jpeg",
    bio: "Former UX lead at OpenAI. Specializes in designing human-like conversation flows and implementing effective prompt engineering techniques.",
    // x: "https://x.com/boblee",
    linkedin: "https://www.linkedin.com/in/matiascarpintini/",
    availableDate: "2025-06-01",
  },
  {
    id: "tomas_celichini",
    name: "Tomas Celichini",
    title: "Tomas Celichini",
    position: "Product Leader @ Darwin AI",
    image: "/mentors/tomas.jpeg",
    bio: "Full-stack developer with expertise in connecting AI models to production systems. Creator of three widely-used open source AI toolkits.",
    // x: "https://x.com/boblee",
    linkedin: "https://www.linkedin.com/in/tomas-celichini/",
    availableDate: "2025-06-02",
  },
  {
    id: "federico_molina",
    name: "Federico Molina",
    title: "Federico Molina",
    position: "SWE @ Volt",
    image: "/mentors/federico_molina.jpg",
    bio: "Pioneer in advanced prompt engineering techniques. Developed frameworks for creating robust, context-aware conversational agents.",
    x: "https://x.com/federicomolina",
    linkedin: "https://www.linkedin.com/in/federicomolina86/",
    availableDate: "2025-06-04",
  },
  {
    id: "papa",
    name: "Papa",
    title: "Papa",
    position: "Software Wizard @ ScaleAI & Organizer @ ShipBA",
    image: "/mentors/papa.jpg",
    bio: "Pioneer in advanced prompt engineering techniques. Developed frameworks for creating robust, context-aware conversational agents.",
    x: "https://x.com/sebipaps",
    linkedin:
      "https://www.linkedin.com/in/sebasti%C3%A1n-papanicolau-10baa91b1/",
    availableDate: "2025-05-28",
  },
];

function normalizeDate(dateStr: string) {
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const today = new Date();
const todayDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

export const filteredMentors = mentors.filter((mentor) => {
  const mentorDate = normalizeDate(mentor.availableDate);
  return mentorDate <= todayDate;
});
