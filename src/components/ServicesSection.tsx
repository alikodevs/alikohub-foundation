import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe2, HardHat, CalendarDays, Droplets, ArrowUpRight, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import serviceAcademy from "@/assets/service-academy.jpg";
import serviceConsultancy from "@/assets/service-consultancy.png";
import serviceContech from "@/assets/service-contech.png";
import serviceEvents from "@/assets/service-events.jpg";
import serviceAlikowash from "@/assets/service-alikowash.png";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Globe2,
  HardHat,
  CalendarDays,
  Droplets,
};

const fallbackServices = [
  {
    title: "Aliko Academy",
    description: "Workforce development and certification pathways aligned with global labor markets.",
    icon: GraduationCap,
    image_url: serviceAcademy,
    link: "https://academy.alikohub.com/",
  },
  {
    title: "Aliko Consultancy",
    description: "Career advisory, professional development, and global mentorship services.",
    icon: Globe2,
    image_url: serviceConsultancy,
    link: "https://alikoconsultancy.lovable.app",
  },
  {
    title: "Aliko Events",
    description: "Industry matchmaking, innovation forums, and ecosystem-building engagements.",
    icon: CalendarDays,
    image_url: serviceEvents,
    link: "https://aliko-event-suite.lovable.app/",
  },
  {
    title: "Aliko Engineering Technology",
    description: "Applied engineering, digital infrastructure, and technology-driven solutions.",
    icon: HardHat,
    image_url: serviceContech,
    link: "#",
  },
  {
    title: "Aliko WASH",
    description: "Water, sanitation, and hygiene solutions driving public health impact and community resilience across Africa.",
    icon: Droplets,
    image_url: serviceAlikowash,
    link: "https://alikowash.lovable.app/",
  },
];

interface ServiceCardProps {
  service: {
    title: string;
    description: string | null;
    image_url: string | null;
    link: string | null;
    icon?: LucideIcon;
  };
  fallbackImage: string;
  fallbackIcon: LucideIcon;
}

function ServiceCard({ service, fallbackImage, fallbackIcon }: ServiceCardProps) {
  const Icon = service.icon || fallbackIcon;
  return (
    <div className="group relative w-[260px] sm:w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image_url || fallbackImage}
          alt={service.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{service.description}</p>
        {service.link && (
          <a
            href={service.link}
            target={service.link.startsWith("http") ? "_blank" : undefined}
            rel={service.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
          >
            View site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [isPaused, setIsPaused] = useState(false);

  const { data: dbServices } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const services = dbServices && dbServices.length > 0 ? dbServices : fallbackServices;

  // Duplicate cards for seamless infinite marquee
  const displayServices = [...services, ...services];

  return (
    <section id="ventures" className="relative py-24 lg:py-32 bg-[hsl(204,60%,92%)] dark:bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            AlikoHub Ventures
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Our <span className="text-gradient-amber">Ventures</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Independent operating companies powering the AlikoHub ecosystem and driving sustainable impact across Digital Health, STEM, innovation, and enterprise.
          </p>
        </motion.div>

        {/* Marquee container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Sliding track */}
          <div
            className="flex gap-4 sm:gap-6"
            style={{
              animation: 'ventures-marquee 35s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
              width: 'max-content',
            }}
          >
            {displayServices.map((service, i) => (
              <ServiceCard
                key={`${service.title}-${i}`}
                service={service}
                fallbackImage={fallbackServices[i % fallbackServices.length].image_url}
                fallbackIcon={fallbackServices[i % fallbackServices.length].icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
