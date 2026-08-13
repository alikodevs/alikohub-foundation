import { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, ArrowUpRight, LucideIcon } from "lucide-react";
import { usePublicServices } from "@/hooks/useCms";
import { getFullMediaUrl } from "@/lib/utils";

interface ServiceItem {
  id?: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  imageUrl?: string | null;
  link?: string | null;
  icon?: LucideIcon;
}

interface ServiceCardProps {
  service: ServiceItem;
}

function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon || Globe2;
  const rawImg = service.image_url || service.imageUrl;
  return (
    <div className="group relative w-[260px] sm:w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative h-48 overflow-hidden bg-muted">
        {rawImg && (
          <img
            src={getFullMediaUrl(rawImg)}
            alt={service.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-foreground">{service.title}</h3>
        {service.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{service.description}</p>
        )}
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
  const { data: dbServices } = usePublicServices();

  const services: ServiceItem[] = dbServices || [];

  if (services.length === 0) {
    return null;
  }

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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
