// Single source of truth for AlikoHub Foundation legal status, brand text,
// and gated features. Do not claim recognition that has not been documented.

export const foundationStatus = {
  // Flip to true only after Washington nonprofit registration is confirmed.
  waNonprofitFormationConfirmed: false,
  // Flip to true only after IRS 501(c)(3) determination letter is received.
  federalTaxExemptConfirmed: false,
  // Donations are gated off until legal + operational readiness is approved.
  donationsEnabled: false,
} as const;

export const foundation = {
  legalName: "AlikoHub Foundation",
  shortName: "AlikoHub Foundation",
  tagline: "Resourcefulness into lasting opportunity.",
  mission:
    "AlikoHub Foundation advances equitable access to education, workforce development, technology, public health, water, sanitation and hygiene, entrepreneurship, and community resilience through locally grounded programs and global partnerships.",
  vision:
    "A world where every person — regardless of geography or circumstance — has the resources, tools, and opportunities to build a dignified future for themselves and their community.",
  primaryLocations: ["Washington State, USA", "Ethiopia"],
  contactEmail: "info@alikohubfoundation.org",
  separationStatement:
    "AlikoHub Foundation is a legally separate nonprofit organization within the broader AlikoHub ecosystem. It maintains separate governance, finances, programs, records, and legal responsibilities from AlikoHub LLC. Any collaboration between the entities must be documented, mission-aligned, and conducted on appropriate terms.",
  statusStatement:
    "Washington nonprofit formation and U.S. federal tax-exempt recognition are pending. We are not currently able to issue tax-deductible donation receipts.",
} as const;

// Board of Directors — bios pending board approval.
export const board = [
  {
    name: "Boni Aliko",
    role: "Founder & President; Director",
    bio: "Bio pending board approval.",
  },
  {
    name: "Eyouel Berhe",
    role: "Treasurer; Director",
    bio: "Bio pending board approval.",
  },
  {
    name: "Hanna Tesfaye",
    role: "Secretary; Director",
    bio: "Bio pending board approval.",
  },
] as const;

// Program pillars aligned with the mission statement. Marked as draft
// program areas; no claim of active delivery, funding, or partnerships.
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
      "Practical skills, apprenticeships, and pathways connecting learners to dignified income opportunities.",
  },
  {
    slug: "technology",
    title: "Technology & Digital Inclusion",
    summary:
      "Digital literacy, appropriate technology, and infrastructure that serves community-defined priorities.",
  },
  {
    slug: "health",
    title: "Public Health",
    summary:
      "Community-led health awareness, prevention, and partnerships that strengthen existing local systems.",
  },
  {
    slug: "wash",
    title: "Water, Sanitation & Hygiene",
    summary:
      "WASH initiatives designed with residents to protect health and dignity, especially for women, girls, and children.",
  },
  {
    slug: "entrepreneurship",
    title: "Entrepreneurship & Enterprise",
    summary:
      "Support for small enterprises and cooperatives that create local economic resilience.",
  },
  {
    slug: "resilience",
    title: "Community Resilience",
    summary:
      "Climate, food security, and social cohesion programs that help communities adapt and recover.",
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
