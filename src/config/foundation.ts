// Single source of truth for AlikoHub Foundation brand, mission,
// governance, and program pillars.

export const foundationStatus = {
  waNonprofitFormationConfirmed: true,
  federalTaxExemptConfirmed: true,
  donationsEnabled: true,
} as const;

export const foundation = {
  legalName: "AlikoHub Foundation",
  shortName: "AlikoHub Foundation",
  tagline: "Turning resourcefulness into lasting opportunity.",
  mission:
    "AlikoHub Foundation advances equitable access to education, workforce development, technology, public health, water, sanitation and hygiene, entrepreneurship, and community resilience through locally grounded programs and global partnerships.",
  vision:
    "A world where every person, regardless of geography or circumstance, has the resources, tools, and opportunities to build a dignified future for themselves and their community.",
  primaryLocations: ["Washington State, USA", "Ethiopia"],
  contactEmail: "info@alikohubfoundation.org",
  separationStatement:
    "AlikoHub Foundation is the nonprofit arm of the AlikoHub ecosystem, with independent governance, finances, and program accountability.",
  statusStatement:
    "AlikoHub Foundation operates as a mission-driven nonprofit committed to transparent governance, equitable programs, and measurable community impact.",
} as const;

import boniPhoto from "@/assets/team/boni-aliko.jpg.asset.json";
import bonsaPhoto from "@/assets/team/bonsa-aliko.jpg.asset.json";
import abdiPhoto from "@/assets/team/abdi-aliko.jpg.asset.json";
import biniyamPhoto from "@/assets/team/biniyam-birassa.jpg.asset.json";
import lensaPhoto from "@/assets/team/lensa-aliko.jpg.asset.json";
import baatiiPhoto from "@/assets/team/baatii-aliko.jpg.asset.json";
import hannaPhoto from "@/assets/team/hanna-tesfaye.png.asset.json";

// Board of Directors.
export const board = [
  {
    name: "Boni Aliko",
    role: "Founder & President; Director",
    bio: "Founder of the AlikoHub ecosystem, leading strategy, partnerships, and program design across education, health, and workforce development.",
    photo: boniPhoto.url,
  },
  {
    name: "Bonsa Aliko",
    role: "Treasurer; Director",
    bio: "Oversees financial stewardship, reserves policy, and donor accountability, ensuring every dollar advances the Foundation's mission.",
    photo: bonsaPhoto.url,
  },
  {
    name: "Hanna Tesfaye",
    role: "Secretary; Director",
    bio: "Leads governance, board coordination, and safeguarding oversight, keeping the Foundation accountable to its communities and partners.",
    photo: hannaPhoto.url,
  },
] as const;

// Leadership team.
export const leadership = [
  {
    name: "Boni Aliko",
    role: "Founder & Chief Executive Officer",
    bio: "Sets the Foundation's strategic direction, builds global partnerships, and leads program design across the seven priority areas.",
    photo: boniPhoto.url,
  },
  {
    name: "Bonsa Aliko",
    role: "Chief Operating Officer",
    bio: "Runs day-to-day operations, finance, and hub delivery, translating strategy into accountable execution on the ground.",
    photo: bonsaPhoto.url,
  },
  {
    name: "Abdi Aliko",
    role: "Chief Technology Officer",
    bio: "Leads technology, digital inclusion infrastructure, and the data systems that power monitoring, learning, and reporting.",
    photo: abdiPhoto.url,
  },
  {
    name: "Biniyam Birassa",
    role: "Program Director",
    bio: "Oversees program quality across education, workforce, and enterprise tracks, from curriculum design to outcome measurement.",
    photo: biniyamPhoto.url,
  },
  {
    name: "Lensa Aliko",
    role: "Director of Health Programs",
    bio: "Directs public and digital health work, including health workforce pipelines, mobile health, and WASH-linked initiatives.",
    photo: lensaPhoto.url,
  },
  {
    name: "Baatii Aliko",
    role: "Director of Strategic Partnership & Development",
    bio: "Builds institutional partnerships, funding relationships, and the collaborations that extend program reach.",
    photo: baatiiPhoto.url,
  },
  {
    name: "Hanna Tesfaye",
    role: "Marketing Manager & Executive Assistant",
    bio: "Leads communications, brand stewardship, and executive coordination across the Foundation's teams and partners.",
    photo: hannaPhoto.url,
  },
] as const;



// Program pillars aligned with the mission statement.
export const programPillars = [
  {
    slug: "education",
    title: "Education & Learning",
    summary:
      "Expanding access to quality learning through localized curricula, teacher support, and open educational resources.",
  },
  {
    slug: "workforce",
    title: "Workforce & Livelihoods",
    summary:
      "Market-aligned training, apprenticeships, and employer matchmaking that connect young people to dignified income opportunities.",
  },
  {
    slug: "technology",
    title: "Technology & Digital Inclusion",
    summary:
      "Digital literacy, AI, cloud, and data skills paired with appropriate infrastructure that serves community-defined priorities.",
  },
  {
    slug: "health",
    title: "Public & Digital Health",
    summary:
      "Health workforce pipelines, mobile health, and climate-linked disease monitoring that strengthen local public health systems.",
  },
  {
    slug: "wash",
    title: "Water, Sanitation & Hygiene",
    summary:
      "WASH infrastructure, hygiene education, and water quality monitoring designed with residents to protect health and dignity.",
  },
  {
    slug: "entrepreneurship",
    title: "Entrepreneurship & Enterprise",
    summary:
      "Incubation, mentorship, and reinvestment models that grow youth-led ventures and build local economic resilience.",
  },
  {
    slug: "resilience",
    title: "Community Resilience",
    summary:
      "Climate adaptation, food security, and social cohesion programs that help communities adapt, recover, and thrive.",
  },
] as const;

// Approach model: Listen → Equip → Implement → Measure → Scale.
export const approach = [
  { stage: "Listen", meaning: "Begin with community priorities. Design with, not for." },
  { stage: "Equip", meaning: "Provide skills, tools, infrastructure, technical support, and access to networks." },
  { stage: "Implement", meaning: "Deliver practical initiatives through accountable local and global partnerships." },
  { stage: "Measure", meaning: "Define outcomes, collect proportionate data, protect privacy, and learn from results." },
  { stage: "Scale", meaning: "Expand what works responsibly while adapting to place, culture, and capacity." },
] as const;
