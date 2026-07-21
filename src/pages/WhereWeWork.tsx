import { PageShell } from "@/components/foundation/PageShell";
import { MapPin, Globe } from "lucide-react";

type Hub = {
  country: string;
  city: string;
  target: string;
  focus: string;
  status: "Flagship" | "Active" | "Planned" | "Future";
  timeline: string;
  region: string;
};

const hubs: Hub[] = [
  // Years 1–2 · North America flagship
  { country: "United States", city: "SeaTac, WA → Seattle, Tacoma, Spokane; CA, TX, NY, GA", target: "5,000", focus: "Diaspora engagement, workforce pathways, U.S.-based partnerships", status: "Flagship", timeline: "Years 1–2", region: "North America" },

  // Years 1–2 · Ethiopia flagship + Horn of Africa cluster
  { country: "Ethiopia", city: "Addis Ababa → Adama, Hawassa, Bahir Dar, Mekele", target: "10,000", focus: "Digital Health, One Health, STEM, WASH, workforce development", status: "Flagship", timeline: "Years 1–2", region: "Africa" },
  { country: "Djibouti", city: "Djibouti City", target: "1,500", focus: "Horn of Africa cluster, workforce & digital skills", status: "Planned", timeline: "Years 1–2", region: "Africa" },
  { country: "Somalia", city: "Mogadishu", target: "2,000", focus: "Horn of Africa cluster, community resilience", status: "Planned", timeline: "Years 1–2", region: "Africa" },
  { country: "Sudan", city: "Port Sudan / Khartoum (security-permitting)", target: "2,500", focus: "Horn of Africa cluster, humanitarian-linked programs", status: "Planned", timeline: "Years 1–2", region: "Africa" },
  { country: "South Sudan", city: "Juba", target: "1,500", focus: "Horn of Africa cluster, education & livelihoods", status: "Planned", timeline: "Years 1–2", region: "Africa" },

  // Years 3–5 · Global expansion
  { country: "Nigeria", city: "Lagos", target: "8,000", focus: "Creative economy, FinTech, workforce pipelines", status: "Planned", timeline: "Years 3–4", region: "Africa" },
  { country: "Ghana", city: "Accra", target: "5,000", focus: "Pan-African digital skills & entrepreneurship", status: "Planned", timeline: "Years 3–4", region: "Africa" },
  { country: "Senegal", city: "Dakar", target: "4,000", focus: "Francophone West Africa hub", status: "Planned", timeline: "Years 3–4", region: "Africa" },
  { country: "Cabo Verde", city: "Praia", target: "1,500", focus: "Island economies, digital & blue skills", status: "Planned", timeline: "Years 3–4", region: "Africa" },
  { country: "Sierra Leone", city: "Freetown", target: "2,500", focus: "Youth workforce & community resilience", status: "Planned", timeline: "Years 3–4", region: "Africa" },
  { country: "Cameroon", city: "Yaoundé", target: "3,000", focus: "Central Africa hub, bilingual delivery", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "DR Congo", city: "Kinshasa", target: "3,500", focus: "Central Africa hub, health & workforce systems", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Uganda", city: "Kampala", target: "3,000", focus: "AgriTech, workforce & digital skills", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Tanzania", city: "Dar es Salaam", target: "4,000", focus: "Blue economy & workforce development", status: "Future", timeline: "Years 4–5", region: "Africa" },
  { country: "Zimbabwe", city: "Harare", target: "2,500", focus: "Southern Africa hub, STEM & entrepreneurship", status: "Future", timeline: "Years 4–5", region: "Africa" },
];

const statusStyles: Record<Hub["status"], string> = {
  Flagship: "bg-primary text-primary-foreground",
  Active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Planned: "bg-primary/15 text-primary",
  Future: "bg-muted text-muted-foreground",
};

export default function WhereWeWork() {
  return (
    <PageShell
      eyebrow="Where we work"
      title="Rooted in place. Connected globally."
      intro="Anchored by flagships in Washington State and Ethiopia, with a Horn of Africa cluster in Years 1–2 and a phased expansion across West, Central, East, and Southern Africa in Years 3–5. Every hub is locally led and community-designed."
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "15", v: "Country programs by Year 5" },
          { k: "50,000", v: "Youth reached (cumulative)" },
          { k: "10+", v: "Innovation hubs operational" },
          { k: "≥45%", v: "Young women participation" },
        ].map((s) => (
          <div key={s.v} className="rounded-xl border border-border bg-card p-5">
            <p className="font-heading text-3xl font-bold text-primary">{s.k}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <article key={hub.country} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">{hub.country}</h2>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[hub.status]}`}>
                {hub.status}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              <span className="line-clamp-2">{hub.city}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" aria-hidden />
              <span>{hub.region} · {hub.timeline}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{hub.focus}</p>
            <p className="mt-4 font-heading text-2xl font-bold text-primary">{hub.target}</p>
            <p className="text-xs text-muted-foreground">Youth target</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Country plans are aligned with national youth strategies, the African Union&rsquo;s Agenda 2063, and the UN Sustainable Development Goals.
      </p>
    </PageShell>
  );
}
