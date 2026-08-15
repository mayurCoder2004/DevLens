const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

let initialized = false;

export function initializeAnalytics() {
  if (initialized || !MEASUREMENT_ID) {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
  });

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

  document.head.appendChild(script);

  initialized = true;
}

export function trackPageView(pathname) {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !MEASUREMENT_ID
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pathname,
  });
}

export function trackEvent(eventName, parameters = {}) {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !MEASUREMENT_ID
  ) {
    return;
  }

  window.gtag("event", eventName, parameters);
}
