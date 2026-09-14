export const GOOGLE_ADS_ID = "AW-18436275672";
export const GOOGLE_ADS_CONVERSION_LABEL = "D8I4CkEX5PccENj7jNdE";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let scriptRequested = false;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
}

export function loadGoogleAdsTag() {
  if (typeof window === "undefined") return;
  ensureGtag();
  window.gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });

  if (scriptRequested || document.querySelector(`script[data-google-ads-id="${GOOGLE_ADS_ID}"]`)) return;
  scriptRequested = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  script.dataset.googleAdsId = GOOGLE_ADS_ID;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
}

export function trackGoogleAdsLeadConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
  });
}
