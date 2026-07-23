"use client";

import { useReportWebVitals } from "next/web-vitals";

const TRACKED = new Set(["LCP", "CLS", "INP", "FCP", "TTFB"]);

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!TRACKED.has(metric.name)) return;

    const payload = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      path: window.location.pathname,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/vitals", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/vitals", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  });

  return null;
}
