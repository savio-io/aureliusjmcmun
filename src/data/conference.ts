import dishikaPhoto from "@/assets/dishika-yadav.jpg.asset.json";
import somyaPhoto from "@/assets/somya-yadav.jpg.asset.json";

/**
 * AURELIUS MUN 2026 — editable conference content.
 * Update agendas, EB, links, contacts, schedule and photos here.
 * Leave values as null / empty to show "To Be Announced" placeholders.
 */

export const conference = {
  name: "Aurelius MUN",
  year: "2026",
  dates: "18–19 November 2026",
  datesShort: "18 — 19 November 2026",
  venue: {
    name: "Jesus and Mary Convent School",
    lines: ["'O' Block, Delta - III ", "Greater Noida, Uttar Pradesh"],
    city: "Greater Noida",
    /** Paste a Google Maps embed URL here to show the live map. */
    mapEmbedUrl: null as string | null,
    mapsUrl: "https://maps.app.goo.gl/NxR55zPxVSsmceJX9",
  },
  /** Replace with the real registration form URL when available. */
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfAXWncjt242QcjeLV8uM3nzcVOlVTRBlRtHkkWCDu1hXyHqA/viewform?usp=sharing&ouid=112415953088803668529" as string | null,
  /** External delegation registration form — must differ from the internal one. */
  externalRegistrationUrl: "https://forms.gle/yiEn6Zb6C7E8i5rVA" as string | null,
  delegateMatrixUrl: "https://docs.google.com/spreadsheets/d/1P31OodkUGvIXAeLv4JcECTeyZLyuD8zvDkso1D9GmWI/edit?usp=sharing",
  contact: {
    email: "aureliusjmcmun@gmail.com" as string | null,
    instagram: "https://www.instagram.com/aureliusjmcmun/" as string | null,
    phone: "+91 93184 69083" as string | null,
    /** Additional Teacher In-Charge contact. */
    teacherPhone: "+91 70115 43292" as string | null,
  },
};

export const fees = [
  {
    id: "internal",
    label: "Internal Delegates",
    price: "₹1,600",
    note: "For delegates from Jesus and Mary Convent School.",
    earlyBird: "Early Bird Fee · Valid until 30 October 2026",
  },
  {
    id: "external",
    label: "External Delegates",
    price: "₹2,000",
    note: "For delegates from other schools and institutions.",
    earlyBird: "Early Bird Fee · Valid until 30 October 2026",
  },
];

export const schoolDelegation = {
  label: "School Delegation",
  price: "+ ₹500",
  priceNote: "Once per school · not per delegate",
  points: [
    "Applies when 8 or more delegates from the same school register.",
    "The regular delegate fee still applies to each delegate.",
    "An additional ₹500 is paid once by the school, regardless of whether there are 8, 9, 10 or more delegates.",
    "School Delegations are eligible for the Best School Delegation award.",
  ],
};

export const feeNotes = ["Fees are non-negotiable.", "No refunds will be provided once registration is confirmed."];

export const schoolAward = {
  title: "Best School Delegation",
  description:
    "Awarded to the school delegation demonstrating the strongest overall performance, participation, diplomacy, and representation across the conference.",
  prize: "Best School Delegation Trophy + Certificate of Recognition",
};

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
    agenda:
      "Addressing the Global Refugee Crisis with Special Emphasis on Equitable Responsibility-Sharing and Refugee Integration",
  },
  {
    index: "02",
    short: "WHO",
    name: "World Health Organization",
    description:
      "The UN's specialised agency for global public health, coordinating international responses to health challenges and shaping health policy.",
    agenda:
      "Strengthening Global Health Security and Pandemic Response with Special Emphasis on Vaccine Equity and Early Outbreak Detection",
  },
  {
    index: "03",
    short: "AIPPM",
    name: "All India Political Parties Meet",
    description:
      "A simulation of Indian national politics, where delegates represent political leaders and debate issues of national importance.",
    agenda:
      "Deliberation on India’s Response to Cross-Border Terrorism and Regional Security",
  },
];

export const days = [
  { index: "01", date: "18 November", dress: "Traditional Indian" },
  { index: "02", date: "19 November", dress: "Formal Western" },
];

export type Person = { name: string; role: string | null; photo: string | null };

export const secretariat: Person[] = [
  { name: "Savio Jose", role: "Founder & Director General", photo: null },
  { name: "Aditya Kumar Singh", role: "Founder & Secretary General", photo: null },
  { name: "Aradhya Shakya", role: "Deputy Director General", photo: null },
  { name: "Somya Yadav", role: "Director General of Academics", photo: somyaPhoto.url },
  { name: "Dishika Yadav", role: "Director General of Operations", photo: dishikaPhoto.url },
];

/** Add EB members per committee when announced, e.g. { committee: "UNGA", name: "...", role: "Chairperson", photo: null } */
export const executiveBoard: { committee: string; name: string; role: string; photo: string | null }[] = [];

/** Add a `time` to any item once timings are announced. */
export const schedule: { day: string; items: { time: string | null; title: string }[] }[] = [
  {
    day: "Day 01 · 18 November",
    items: ["Opening Ceremony", "Session 1", "Lunch", "Session 2", "High Tea"].map((title) => ({ time: null, title })),
  },
  {
    day: "Day 02 · 19 November",
    items: ["Session 3", "Lunch", "Session 4", "Closing & Award Ceremony", "High Tea"].map((title) => ({ time: null, title })),
  },
];

export const faqs = [
  {
    q: "What is Aurelius MUN?",
    a: "Aurelius MUN 2026 is a two-day Model United Nations conference bringing delegates together for structured debate, diplomacy and discussion.",
  },
  { q: "When is Aurelius MUN?", a: "18–19 November 2026." },
  {
    q: "Where is the conference being held?",
    a: "Jesus and Mary Convent School, Delta-3, O Block, Greater Noida, Uttar Pradesh.",
  },
  {
    q: "What committees are available?",
    a: "United Nations General Assembly (UNGA), World Health Organization (WHO) and All India Political Parties Meet (AIPPM).",
  },
  { q: "What is the dress code?", a: "Day 1: Traditional Indian. Day 2: Formal Western." },
  { q: "What are the agendas?", a: "UNGA: Addressing the Global Refugee Crisis with Special Emphasis on Equitable Responsibility-Sharing and Refugee Integration. WHO: Strengthening Global Health Security and Pandemic Response with Special Emphasis on Vaccine Equity and Early Outbreak Detection. AIPPM: Deliberation on India’s Response to Cross-Border Terrorism and Regional Security." },
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
