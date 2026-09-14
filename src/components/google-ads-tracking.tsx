import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { disableGoogleAdsTracking, loadGoogleAdsTag } from "@/lib/google-ads";

const CONSENT_KEY = "nexo_ads_consent_v1";
const CONSENT_VERSION = "2026-09-14";
const CONSENT_REQUIRED_COUNTRIES = new Set([
  "AT", "BE", "BG", "BR", "HR", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HU",
  "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI",
  "SK", "CH", "GB",
]);

type ConsentChoice = "accepted" | "rejected";

function readChoice(): ConsentChoice | null {
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null") as { choice?: ConsentChoice; version?: string } | null;
    return stored?.version === CONSENT_VERSION && (stored.choice === "accepted" || stored.choice === "rejected")
      ? stored.choice
      : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, version: CONSENT_VERSION, decidedAt: new Date().toISOString() }));
}

async function isConsentRequired() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2000);
  try {
    const response = await fetch("/cdn-cgi/trace", { signal: controller.signal });
    if (!response.ok) return true;
    const location = (await response.text()).match(/^loc=(.+)$/m)?.[1]?.trim().toUpperCase();
    return !location || location === "XX" || location === "T1" || CONSENT_REQUIRED_COUNTRIES.has(location);
  } catch {
    return true;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function GoogleAdsTracking() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const openSettings = () => setShowBanner(true);
    const syncChoice = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      const choice = readChoice();
      if (choice === "accepted") loadGoogleAdsTag();
      if (choice === "rejected") disableGoogleAdsTracking();
    };
    window.addEventListener("nexo:cookie-settings", openSettings);
    window.addEventListener("storage", syncChoice);

    const choice = readChoice();
    if (choice === "accepted") {
      loadGoogleAdsTag();
    } else if (!choice) {
      void isConsentRequired().then((required) => {
        if (required) setShowBanner(true);
        else loadGoogleAdsTag();
      });
    }

    return () => {
      window.removeEventListener("nexo:cookie-settings", openSettings);
      window.removeEventListener("storage", syncChoice);
    };
  }, []);

  const decide = (choice: ConsentChoice) => {
    saveChoice(choice);
    setShowBanner(false);
    if (choice === "accepted") loadGoogleAdsTag();
    else disableGoogleAdsTracking();
  };

  if (!showBanner) return null;

  return (
    <aside className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-xl rounded-lg border border-border bg-surface p-5 shadow-card" aria-label="Preferências de privacidade">
      <p className="font-display text-base font-semibold text-foreground">Sua privacidade</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Usamos cookies de publicidade para medir resultados dos anúncios do Google. Você pode aceitar ou recusar com a mesma facilidade.
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => decide("rejected")}>Recusar</Button>
        <Button type="button" onClick={() => decide("accepted")}>Aceitar</Button>
      </div>
      <a href="/privacidade" className="mt-3 inline-block text-xs text-muted-foreground underline underline-offset-4">
        Política de privacidade
      </a>
    </aside>
  );
}
