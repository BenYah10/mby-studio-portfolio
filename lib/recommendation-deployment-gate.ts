/**
 * MBY Consulting — independent recommendation rollout gate.
 * Server-only. No credentials are sent to client components.
 * Default deny, including direct API calls in Production.
 */
import "server-only";
import type { NextRequest } from "next/server";

export function isRecommendationSubmissionEnabled(request: NextRequest): boolean {
  if (
    process.env.MBY_RECOMMENDATIONS_FORM_ENABLED !== "true" ||
    process.env.MBY_RECOMMENDATIONS_VERIFICATION_ENABLED !== "true"
  ) return false;

  if (process.env.VERCEL_ENV === "production") {
    const hostname = process.env.MBY_RECOMMENDATIONS_PUBLIC_HOSTNAME;
    return process.env.MBY_RECOMMENDATIONS_PRODUCTION_ENABLED === "true" &&
      typeof hostname === "string" && hostname.length > 0 &&
      !hostname.includes(":") && !hostname.includes("/") &&
      request.nextUrl.hostname.toLowerCase() === hostname.toLowerCase();
  }

  // Local development and Vercel Preview are usable only when explicitly
  // activated with both server flags. Other production-like environments deny.
  return process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview";
}
