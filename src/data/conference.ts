/**
 * AURELIUS MUN 2026 — editable conference content.
 * Update agendas, EB, links, contacts, schedule and photos here.
 * Leave values as null / empty to show "To Be Announced" placeholders.
 */

export const conference = {
  name: "Aurelius MUN",
  year: "2026",
  dates: "11–12 November 2026",
  datesShort: "11 — 12 November 2026",
  venue: {
    name: "Jesus and Mary Convent School",
    lines: ["'O' Block, Delta - III ", "Greater Noida, Uttar Pradesh"],
    city: "Greater Noida",
    /** Paste a Google Maps embed URL here to show the live map. */
    mapEmbedUrl: null as string | null,
  },
  /** Replace with the real registration form URL when available. */
  registrationUrl: null as string | null,
  contact: {
    email: "aureliusjmcmun@gmail.com" as string | null,
    instagram: "https://www.instagram.com/aureliusjmcmun/" as string | null,
    phone: "+91 93184 69083" as string | null,
    registrationContact: null as string | null,
  },
};

export const fees = [
  {
    id: "internal",
    label: "Internal Delegate",
    price: "₹1,500",
    note: "For delegates from Jesus and Mary Convent School.",
  },
  {
    id: "external",
    label: "External Delegate",
    price: "₹2,000",
    note: "For delegates from other schools and institutions.",
  },
];

export type Committee = {
  index: string;
  short: string;
  name: string;
  description: string;
  agenda: string | null;
};

export const committees: Committee[] = [
  {
    index: "01",
    short: "UNGA",
    name: "United Nations General Assembly",
    description:
      "The principal deliberative body of the United Nations, where every member state holds an equal voice in debating questions of international concern.",
    agenda: null,
  },
  {
    index: "02",
    short: "WHO",
    name: "World Health Organization",
    description:
      "The UN's specialised agency for global public health, coordinating international responses to health challenges and shaping health policy.",
    agenda: null,
  },
  {
    index: "03",
    short: "AIPPM",
    name: "All India Political Parties Meet",
    description:
      "A simulation of Indian national politics, where delegates represent political leaders and debate issues of national importance.",
    agenda: null,
  },
];

export const days = [
  { index: "01", date: "11 November", dress: "Formal Western" },
  { index: "02", date: "12 November", dress: "Traditional Indian" },
];

export type Person = { name: string; role: string | null; photo: string | null };

export const secretariat: Person[] = [
  { name: "Savio Jose", role: null, photo: null },
  { name: "Aditya Kumar Singh", role: null, photo: null },
];

/** Add EB members per committee when announced, e.g. { committee: "UNGA", name: "...", role: "Chairperson", photo: null } */
export const executiveBoard: { committee: string; name: string; role: string; photo: string | null }[] = [];

/** Fill in `time` for each item once the schedule is finalised. */
export const schedule: { day: string; items: { time: string | null; title: string }[] }[] = [
  {
    day: "Day 01 · 11 November",
    items: [
      { time: null, title: "Registration" },
      { time: null, title: "Opening Ceremony" },
      { time: null, title: "Committee Sessions" },
      { time: null, title: "Lunch" },
    ],
  },
  {
    day: "Day 02 · 12 November",
    items: [
      { time: null, title: "Committee Sessions" },
      { time: null, title: "Break" },
      { time: null, title: "Closing Ceremony" },
      { time: null, title: "Awards" },
    ],
  },
];

export const faqs = [
  {
    q: "What is Aurelius MUN?",
    a: "Aurelius MUN 2026 is a two-day Model United Nations conference bringing delegates together for structured debate, diplomacy and discussion.",
  },
  { q: "When is Aurelius MUN?", a: "11–12 November 2026." },
  {
    q: "Where is the conference being held?",
    a: "Jesus and Mary Convent School, Delta-3, O Block, Greater Noida, Uttar Pradesh.",
  },
  {
    q: "What committees are available?",
    a: "United Nations General Assembly (UNGA), World Health Organization (WHO) and All India Political Parties Meet (AIPPM).",
  },
  { q: "What is the dress code?", a: "Day 1: Formal Western. Day 2: Traditional Indian." },
  { q: "When will agendas be announced?", a: "To be announced." },
  { q: "When will the Executive Board be announced?", a: "To be announced." },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Committees", href: "#committees" },
  { label: "Conference", href: "#conference" },
  { label: "Secretariat", href: "#secretariat" },
  { label: "Awards", href: "#awards" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const awards = [
  { title: "Best Delegate", count: "1 per committee", prize: "Trophy + Medal + Certificate" },
  { title: "High Commendation", count: "1 per committee", prize: "Medal + Certificate" },
  { title: "Special Mention", count: "3 per committee", prize: "Certificate" },
  { title: "Verbal Mention", count: "Number varies according to committee size", prize: "Certificate" },
  { title: "Participation", count: "All remaining delegates", prize: "Certificate" },
];
