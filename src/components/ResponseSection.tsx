import { motion } from "framer-motion";
import { TrendingUp, Globe, Target, Handshake, HeartPulse, Rocket } from "lucide-react";
import { cardColors } from "@/lib/card-colors";

const responses = [
  {
    icon: TrendingUp,
    label: "Employment Rate",
    value: "85%",
    description: "Target placement within 12 months",
  },
  {
    icon: Globe,
    label: "Regional Hubs",
    value: "10",
    description: "Distributed innovation centers with hybrid learning",
  },
  {
    icon: Target,
    label: "Female Participation",
    value: "45%+",
    description: "Minimum across all programs and tracks",
  },
  {
    icon: Handshake,
    label: "Partnerships",
    value: "15–25",
    description: "Public-private partnerships formalized per year",
  },
  {
    icon: HeartPulse,
    label: "SDG & Agenda 2063",
    value: "100%",
    description: "Alignment with climate and One Health frameworks",
  },
  {
    icon: Rocket,
    label: "Youth Trained",
    value: "50K",
    description: "Over 5 years with direct job pipelines",
  },
];

export function ResponseSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
            Our Response
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            How <span className="text-gradient-amber">AlikoHub</span> Responds
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {responses.map((item, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <motion.div
                key={item.label}
                className={`group relative overflow-hidden rounded-2xl ${color.bg} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-card dark:border dark:border-primary/20`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color.iconBg} dark:bg-primary/10`}>
                      <item.icon className={`h-5 w-5 ${color.text} dark:text-primary`} />
                    </div>
                    <motion.span
                      className={`font-heading text-4xl font-bold ${color.text} dark:text-primary`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2, type: "spring" }}
                    >
                      {item.value}
                    </motion.span>
                  </div>
                  <h3 className={`font-heading text-sm font-semibold uppercase tracking-wide ${color.text} dark:text-foreground`}>
                    {item.label}
                  </h3>
                  <p className={`mt-1 text-sm ${color.text} dark:text-muted-foreground`}>{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
