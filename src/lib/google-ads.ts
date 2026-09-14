export const GOOGLE_ADS_ID = "AW-18436275672";
export const GOOGLE_ADS_CONVERSION_LABEL = "D8I4CkEX5PccENj7jNdE";
export const GOOGLE_ADS_DIAGNOSTICO_CONVERSION_LABEL = "22RYCIjv6PccENj7jNdE";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let scriptRequested = false;
let adsConsentGranted = false;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
}

export function loadGoogleAdsTag() {
  if (typeof window === "undefined") return;
  ensureGtag();
  adsConsentGranted = true;
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

export function disableGoogleAdsTracking() {
  if (typeof window === "undefined") return;
  adsConsentGranted = false;
  ensureGtag();
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function trackGoogleAdsLeadConversion() {
  if (typeof window === "undefined" || !adsConsentGranted || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
  });
}

export function trackGoogleAdsDiagnosticoConversion() {
  if (typeof window === "undefined" || !adsConsentGranted || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_DIAGNOSTICO_CONVERSION_LABEL}`,
  });
}
