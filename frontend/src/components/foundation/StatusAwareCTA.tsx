import { Button } from "@/components/ui/button";
import { foundationStatus } from "@/config/foundation";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Renders a "Donate" CTA only after donations are enabled in config.
 * Otherwise falls back to "Partner With Us" so the site never implies
 * a donation channel that hasn't been legally and operationally approved.
 */
export function StatusAwareCTA({
  size = "default",
  className = "",
  variant = "default",
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "outline" | "ghost";
}) {
  if (foundationStatus.donationsEnabled) {
    return (
      <Button asChild size={size} variant={variant} className={className}>
        <Link to="/donate">
          <Heart className="mr-2 h-4 w-4" aria-hidden />
          Donate
        </Link>
      </Button>
    );
  }
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <Link to="/partnership">
        Partner With Us
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
      </Link>
    </Button>
  );
}
