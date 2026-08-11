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

import boniPhoto from "@/assets/team/boni-aliko.png";
import birassaPhoto from "@/assets/team/birassa-aliko.png";
import abdiPhoto from "@/assets/team/abdi-birassa.png";
import biniyamPhoto from "@/assets/team/biniyam-birassa.png";
import natnaelPhoto from "@/assets/team/natnael-tariku.png";
import bonsaPhoto from "@/assets/team/bonsa-birassa.jpg";
import lensaPhoto from "@/assets/team/lensa-aliko.png";
import baatiPhoto from "@/assets/team/baati-aliko.png";

// Board of Directors.
export const board = [
  {
    name: "Boni Aliko, PMP",
    role: "Chairman and Director",
    bio: "Founder of the AlikoHub ecosystem, leading strategy, partnerships, and program design across education, health, and workforce development.",
    photo: boniPhoto,
  },
  {
    name: "Birassa Aliko",
    role: "Board Member",
    bio: "Strategic oversight, leadership guidance, and governance alignment for Foundation initiatives.",
    photo: birassaPhoto,
  },
  {
    name: "Natnael Tariku",
    role: "Board Member & Technical Director",
    bio: "Oversees technology architecture, program delivery safeguards, and operations monitoring.",
    photo: natnaelPhoto,
  },
] as const;


// Leadership team.
export const leadership = [
  {
    name: "Boni Aliko, PMP",
    role: "Founder & Chief Executive Officer",
    bio: "Sets the Foundation's strategic direction, builds global partnerships, and leads program design across priority areas.",
    photo: boniPhoto,
  },
  {
    name: "Birassa Aliko",
    role: "Chairman & Director",
    bio: "Provides strategic guidance, governance, and institutional relationship direction.",
    photo: birassaPhoto,
  },
  {
    name: "Abdi Birassa",
    role: "Chief Technology Officer",
    bio: "Leads technology, digital inclusion infrastructure, and data systems powering monitoring and reporting.",
    photo: abdiPhoto,
  },
  {
    name: "Biniyam Birassa",
    role: "Program Director",
    bio: "Oversees program quality across education, workforce, and enterprise tracks.",
    photo: biniyamPhoto,
  },
  {
    name: "Natnael Tariku",
    role: "Technical Director",
    bio: "Directs technical implementation, architecture, and innovation delivery.",
    photo: natnaelPhoto,
  },
  {
    name: "Bonsa Birassa",
    role: "Chief Operating Officer",
    bio: "Runs day-to-day operations, finance, and hub delivery, translating strategy into accountable execution.",
    photo: bonsaPhoto,
  },
  {
    name: "Lensa Aliko",
    role: "Director of Health Programs",
    bio: "Directs public and digital health work, health workforce pipelines, and WASH-linked initiatives.",
    photo: lensaPhoto,
  },
  {
    name: "Baati Aliko",
    role: "Director of Strategic Partnerships",
    bio: "Builds institutional partnerships, funding relationships, and collaborations that extend program reach.",
    photo: baatiPhoto,
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
