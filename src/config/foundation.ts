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

// Board of Directors.
export const board = [
  {
    name: "Boni Aliko",
    role: "Founder & President; Director",
    bio: "Founder of the AlikoHub ecosystem, leading strategy, partnerships, and program design across education, health, and workforce development.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Eyouel Berhe",
    role: "Treasurer; Director",
    bio: "Oversees financial stewardship, reserves policy, and donor accountability, ensuring every dollar advances the Foundation's mission.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hanna Tesfaye",
    role: "Secretary; Director",
    bio: "Leads governance, board coordination, and safeguarding oversight, keeping the Foundation accountable to its communities and partners.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
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
