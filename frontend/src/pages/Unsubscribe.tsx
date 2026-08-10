import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2, MailCheck, Heart, Info } from "lucide-react";
import { publicService } from "@/services/public.service";

type PageState =
  | "loading_status"
  | "already_unsubscribed"
  | "confirm"
  | "idle"
  | "submitting"
  | "success"
  | "error";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("email") || "";

  const [email, setEmail] = useState(token);
  const [status, setStatus] = useState<PageState>(token ? "loading_status" : "idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    publicService
      .getSubscriberStatus(token)
      .then((data) => {
        if (!isMounted) return;
        if (data.email) setEmail(data.email);

        if (data.status === "unsubscribed") {
          setStatus("already_unsubscribed");
        } else {
          setStatus("confirm");
        }
      })
      .catch(() => {
        if (!isMounted) return;
        // Fallback to confirm state if token exists
        setStatus("confirm");
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleUnsubscribe = async (emailToUnsubscribe: string) => {
    if (!emailToUnsubscribe.trim()) return;
    setStatus("submitting");
    setErrorMessage("");
    try {
      await publicService.unsubscribeNewsletter(emailToUnsubscribe.trim().toLowerCase());
      setStatus("success");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to process unsubscription. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center container mx-auto px-6 py-20">
        <Card className="max-w-md w-full border-border/60 shadow-lg">
          <CardHeader className="text-center">
            {status === "success" ? (
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
            ) : status === "already_unsubscribed" ? (
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Info className="h-8 w-8" />
              </div>
            ) : status === "error" ? (
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-8 w-8" />
              </div>
            ) : (
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MailCheck className="h-8 w-8" />
              </div>
            )}

            <CardTitle className="text-2xl font-heading font-bold">
              {status === "success"
                ? "Unsubscribed"
                : status === "already_unsubscribed"
                ? "Already Unsubscribed"
                : status === "confirm"
                ? "Confirm Unsubscribe"
                : status === "loading_status" || status === "submitting"
                ? "Checking Preferences"
                : "Unsubscribe from Updates"}
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              {status === "success"
                ? "You have been unsubscribed successfully."
                : status === "already_unsubscribed"
                ? "You are already unsubscribed from AlikoHub updates."
                : status === "confirm"
                ? "Are you sure you want to unsubscribe from AlikoHub updates?"
                : status === "loading_status" || status === "submitting"
                ? "Please wait while we check your subscriber details..."
                : "Enter your email address below to unsubscribe from AlikoHub Foundation emails."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            {(status === "loading_status" || status === "submitting") && (
              <div className="flex justify-center py-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {status === "already_unsubscribed" && (
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No further action is needed. You will not receive newsletter updates from us.
                </p>
                <Button asChild className="w-full">
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            )}

            {status === "confirm" && (
              <div className="space-y-6 text-center">
                {email && (
                  <p className="text-xs text-muted-foreground bg-muted/50 py-2 px-3 rounded-md font-mono">
                    {email}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/" className="inline-flex items-center justify-center">
                      <Heart className="mr-2 h-4 w-4 text-rose-500 fill-rose-500" />
                      Keep me subscribed
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleUnsubscribe(email)}
                  >
                    Unsubscribe
                  </Button>
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're sorry to see you go. You will no longer receive newsletter updates from us.
                </p>
                <Button asChild className="w-full">
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            )}

            {(status === "idle" || status === "error") && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUnsubscribe(email);
                }}
                className="space-y-4"
              >
                {errorMessage && (
                  <div className="rounded-md bg-destructive/10 p-3 text-xs text-destructive">
                    {errorMessage}
                  </div>
                )}
                <div className="space-y-2">
                  <label
                    htmlFor="unsub-email"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Email address
                  </label>
                  <Input
                    id="unsub-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Unsubscribe
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
