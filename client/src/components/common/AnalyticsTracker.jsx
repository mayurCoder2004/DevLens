import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  initializeAnalytics,
  trackPageView,
} from "../../utils/analytics";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(
      `${location.pathname}${location.search}${location.hash}`,
    );
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);

  return null;
}
