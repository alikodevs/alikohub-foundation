import { foundationStatus } from "@/config/foundation";
import { AlertCircle } from "lucide-react";

/**
 * Displays the current legal-status disclosure so no page can imply
 * 501(c)(3) recognition or Washington nonprofit formation before it is confirmed.
 */
export function LegalStatusNotice({ variant = "banner" }: { variant?: "banner" | "inline" }) {
  const { waNonprofitFormationConfirmed, federalTaxExemptConfirmed } = foundationStatus;

  if (waNonprofitFormationConfirmed && federalTaxExemptConfirmed) return null;

  const message =
    "Washington nonprofit formation and U.S. federal tax-exempt (501(c)(3)) recognition are pending. We cannot currently issue tax-deductible receipts.";

  if (variant === "inline") {
    return (
      <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Status:</span> {message}
      </p>
    );
  }

  return (
    <div
      role="status"
      className="border-b border-border bg-secondary/70"
    >
      <div className="container mx-auto flex items-start gap-2 px-6 py-2 text-xs text-muted-foreground">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
        <p>
          <span className="font-semibold text-foreground">Status:</span> {message}
        </p>
      </div>
    </div>
  );
}
