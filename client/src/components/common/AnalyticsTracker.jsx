import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  initializeAnalytics,
  trackPageView,
} from "../../utils/analytics";

export default function AnalyticsTracker() {
  const location = useLocation();
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    initializeAnalytics();
    setAnalyticsReady(true);
  }, []);

  useEffect(() => {
    if (!analyticsReady) {
      return;
    }

    trackPageView(
      `${location.pathname}${location.search}${location.hash}`,
    );
  }, [
    analyticsReady,
    location.pathname,
    location.search,
    location.hash,
  ]);

  return null;
}
