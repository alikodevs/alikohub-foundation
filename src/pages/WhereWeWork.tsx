import { PageShell } from "@/components/foundation/PageShell";
import { MapPin, Globe } from "lucide-react";

const hubs = [
  { country: "Ethiopia", city: "Addis Ababa", target: "10,000", focus: "Digital Health, One Health, STEM, FinTech, AgriTech", status: "Active", timeline: "Year 1", region: "Africa" },
  { country: "Kenya", city: "Nairobi", target: "7,000", focus: "FinTech, Digital Skills, Entrepreneurship", status: "Planned", timeline: "Years 2–3", region: "Africa" },
  { country: "Nigeria", city: "Lagos", target: "8,000", focus: "Creative Economy, FinTech", status: "Planned", timeline: "Years 2–3", region: "Africa" },
  { country: "Rwanda", city: "Kigali", target: "5,000", focus: "Smart Tech, AI", status: "Planned", timeline: "Years 2–3", region: "Africa" },
  { country: "Ghana", city: "Accra", target: "5,000", focus: "Pan-African Digital Skills", status: "Planned", timeline: "Years 2–3", region: "Africa" },
  { country: "South Africa", city: "Johannesburg", target: "5,000", focus: "Advanced Digital Skills", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Tanzania", city: "Dar es Salaam", target: "3,000", focus: "Blue Economy", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Senegal", city: "Dakar", target: "3,000", focus: "Francophone Digital Skills", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Uganda", city: "Kampala", target: "2,000", focus: "AgriTech", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Morocco", city: "Casablanca", target: "2,000", focus: "North Africa Digital Skills", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "UAE", city: "Dubai", target: "1,500", focus: "FinTech, Innovation Partnerships, Diaspora Engagement", status: "Planned", timeline: "Years 3–4", region: "Middle East" },
  { country: "Germany", city: "Berlin", target: "1,000", focus: "Tech Transfer, Diaspora Skills Bridge", status: "Planned", timeline: "Years 3–4", region: "Europe" },
  { country: "United Kingdom", city: "London", target: "1,000", focus: "Impact Investment, Policy & Advocacy", status: "Future", timeline: "Years 4–5", region: "Europe" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Planned: "bg-primary/15 text-primary",
  Future: "bg-muted text-muted-foreground",
};

export default function WhereWeWork() {
  return (
    <PageShell
      eyebrow="Where we work"
      title="Innovation hubs across Africa and beyond."
      intro="Ten regional hubs across Africa, Europe, and the Middle East, with 90% of our footprint rooted in Africa, where youth learn, practice, innovate, and connect to real opportunity."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <article key={hub.country} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-foreground">{hub.country}</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[hub.status]}`}>
                {hub.status}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              <span>{hub.city} · {hub.timeline}</span>
              <span className="ml-auto flex items-center gap-1 text-xs opacity-70">
                <Globe className="h-3 w-3" aria-hidden />
                {hub.region}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{hub.focus}</p>
            <p className="mt-4 font-heading text-2xl font-bold text-primary">{hub.target}</p>
            <p className="text-xs text-muted-foreground">Youth target</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
