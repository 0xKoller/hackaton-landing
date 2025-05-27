export const judges = [
  {
    index: 0,
    id: "marker",
    name: "Marker",
    title: "Marker",
    position: "Success Engineer @ Metabase",
    image: "/judges/marker.jpeg",
    bio: "Expert in messaging platforms and scalable systems.",
    x: "https://x.com/markerdiaz",
    linkedin:
      "https://www.linkedin.com/in/marcos-andr%C3%A9s-d%C3%ADaz-olmos-80b285130/",
    availableDate: "2025-05-14",
  },
  {
    index: 1,
    id: "rado",
    name: "Valentin Radovich",
    title: "Valentin Radovich",
    position: "ML Engineer @ AceUp",
    image: "/judges/rado.jpeg",
    bio: "Expert in machine learning and scalable systems.",
    x: "https://x.com/software_valen",
    linkedin: "https://www.linkedin.com/in/valentin-fernandez-radovich/",
    availableDate: "2025-05-23",
  },
  {
    index: 2,
    id: "skulli",
    name: "Ezequiel Sculli",
    title: "Ezequiel Sculli",
    position: "Founder, CPO & CTO @ Darwin AI",
    image: "/judges/skulli.jpeg",
    bio: "Expert in machine learning and scalable systems.",
    // x: "https://x.com/software_valen",
    linkedin: "https://www.linkedin.com/in/esculli/",
    availableDate: "2025-05-23",
  },
  {
    index: 3,
    id: "palombo",
    name: "Martin Palombo",
    title: "Martin Palombo",
    position: "Co-Founder & CPO @ Tiendanube",
    image: "/judges/palombo.jpeg",
    bio: "Expert in machine learning and scalable systems.",
    // x: "https://x.com/software_valen",
    linkedin: "https://www.linkedin.com/in/martinpalombo/",
    availableDate: "2025-06-01",
  },
  {
    index: 4,
    id: "waisman",
    name: "Gonzalo Waisman",
    title: "Gonzalo Waisman",
    position: "Co-Founder & CEO @ Hashi",
    image: "/judges/waisman.jpeg",
    bio: "Expert in machine learning and scalable systems.",
    x: "https://x.com/waismaan",
    linkedin: "https://www.linkedin.com/in/gonzalowaisman/",
    availableDate: "2025-05-20",
  },
  {
    index: 5,
    id: "beau",
    name: "Manuel Beaudroit",
    title: "Manuel Beaudroit",
    position: "Co-Founder & CEO @ Belo",
    image: "/judges/beau.jpeg",
    bio: "Expert in machine learning and scalable systems.",
    x: "https://x.com/mbeaudroit",
    linkedin: "https://www.linkedin.com/in/mbeaudroit/",
    availableDate: "2025-06-02",
  },
  {
    index: 6,
    id: "montone",
    name: "Nicolas Montone",
    title: "Nicolas Montone",
    position: "Product Engineer @ v0 & Organizer @ ShipBA",
    image: "/judges/monto.jpeg",
    bio: "Expert in machine learning and scalable systems.",
    x: "https://x.com/montonenico",
    linkedin: "https://www.linkedin.com/in/nicolas-montone/",
    availableDate: "2025-05-26",
  },
];

function normalizeDate(dateStr: string) {
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const today = new Date(new Date().toISOString().slice(0, 10));
export const filteredJudges = judges.filter((judge) => {
  const judgeDate = normalizeDate(judge.availableDate);
  const todayDate = normalizeDate(today.toISOString().slice(0, 10));
  return judgeDate <= todayDate;
});
