
/**
 * MBY Consulting — Professional recommendations
 *
 * M08.05-E/F | Dynamic bilingual publication display
 * with animated carousel and detailed recommendation dialog.
 *
 * Reads authorized publications through the restricted
 * PostgreSQL reader.
 *
 * Preserves the original testimony language and displays
 * optional information only when explicitly authorized.
 *
 * Public recommendations are displayed as compact previews.
 * Full testimonials are available through an interactive dialog.
 *
 * No persistent publication cache.
 * No automatic publication or translation.
 * No direct database access from the browser.
 */

import "server-only";

import type { Locale } from "@/i18n/config";
import type {
  PublishedRecommendation,
} from "@/lib/recommendations-public-read";

import Link from "next/link";
import { connection } from "next/server";
import { routePaths } from "@/i18n/routes";

import {
  RecommendationsCarousel,
} from "./recommendations-carousel";

// ============================================================
// 1. Bilingual interface
// ============================================================

const copy = {
  fr: {
    emptyTitle:
      "Des recommandations authentiques, bientôt.",

    emptyLead:
      "Cet espace présentera des témoignages personnels de personnes avec lesquelles j’ai collaboré, uniquement après leur accord de publication.",

    emptyNote:
      "Aucun témoignage n’est publié pour le moment.",

    unavailableTitle:
      "Recommandations temporairement indisponibles.",

    unavailableNote:
      "Veuillez réessayer ultérieurement.",

    submit:
      "Soumettre une recommandation",

    sectionLabel:
      "Recommandations professionnelles",
  },

  en: {
    emptyTitle:
      "Authentic recommendations, coming soon.",

    emptyLead:
      "This space will feature personal testimonials from people I have worked with, published only with their permission.",

    emptyNote:
      "No testimonials are published yet.",

    unavailableTitle:
      "Recommendations temporarily unavailable.",

    unavailableNote:
      "Please try again later.",

    submit:
      "Submit a recommendation",

    sectionLabel:
      "Professional recommendations",
  },
} as const;

// ============================================================
// 2. Dynamic server-side recommendations section
// ============================================================

export async function RecommendationsSection({
  locale,
}: {
  locale: Locale;
}) {
  const c = copy[locale];

  // Independent activation of publication reading.
  const readingEnabled =
    process.env.MBY_RECOMMENDATIONS_READ_ENABLED === "true";

  // Existing submission feature flag remains unchanged.
  const canSubmit =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_MBY_RECOMMENDATIONS_ENABLED
      === "true";

  let published: PublishedRecommendation[] = [];
  let unavailable = false;

  // ==========================================================
  // 3. Restricted server-side database reading
  // ==========================================================

  // Only query PostgreSQL when publication reading
  // has been explicitly enabled.

  if (readingEnabled) {

    // Require an incoming request before querying PostgreSQL.
    // Keep outside try/catch to preserve Next.js rendering control.

    await connection();

    // M08.07-H.3.4 — Restricted runtime diagnostics.
    let stage: "module_import" | "publication_query" = "module_import";

    try {

      const { getPublishedRecommendations } =
        await import("@/lib/recommendations-public-read");

      stage = "publication_query";
      published = await getPublishedRecommendations();

    } catch (error: unknown) {

      unavailable = true;

      // Log only fixed stages and explicitly allowed error codes.
      // Never log the error object, message, stack, URL or row data.
      const allowedCodes = new Set([
        "ENOENT", "EACCES", "ENOTFOUND", "EAI_AGAIN",
        "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "CONNECT_TIMEOUT",
        "CONNECTION_CLOSED", "CONNECTION_ENDED", "ENETUNREACH",
        "EHOSTUNREACH", "28P01", "28000", "42501", "42883",
        "3F000", "3D000", "53300", "57P01", "08P01", "08006",
        "SELF_SIGNED_CERT_IN_CHAIN", "DEPTH_ZERO_SELF_SIGNED_CERT",
        "UNABLE_TO_VERIFY_LEAF_SIGNATURE", "UNABLE_TO_GET_ISSUER_CERT",
        "UNABLE_TO_GET_ISSUER_CERT_LOCALLY", "CERT_HAS_EXPIRED",
        "ERR_TLS_CERT_ALTNAME_INVALID", "ERR_INVALID_URL",
      ]);
      let code = "UNKNOWN";
      let candidate: unknown = error;
      // Some runtime errors wrap their underlying cause.
      for (let depth = 0; depth < 3; depth++) {
        if (typeof candidate !== "object" || candidate === null) break;
        const detail = candidate as { code?: unknown; cause?: unknown };
        if (typeof detail.code === "string" && allowedCodes.has(detail.code)) {
          code = detail.code;
          break;
        }
        candidate = detail.cause;
      }

      console.error(
        "[MBY] Public recommendation reading unavailable.",
        { stage, code }
      );
    }
  }

  // ==========================================================
  // 4. Recommendation submission link
  // ==========================================================

  const submissionLink = canSubmit ? (
    <p style={{ marginTop: 24 }}>
      <Link
        className="t3-button"
        href={routePaths.recommendationSubmit[locale]}
      >
        {c.submit}
      </Link>
    </p>
  ) : null;

  // ==========================================================
  // 5. Temporary service unavailability
  // ==========================================================

  if (unavailable) {
    return (
      <section
        className="t3-recommendations-empty"
        aria-label={c.sectionLabel}
      >
        <div
          className="t3-recommendations-symbol"
          aria-hidden="true"
        >
          “
        </div>

        <div>
          <h2>{c.unavailableTitle}</h2>

          <p className="t3-recommendations-footnote">
            {c.unavailableNote}
          </p>

          {submissionLink}
        </div>
      </section>
    );
  }

  // ==========================================================
  // 6. Empty publication state
  // ==========================================================

  // Preserve the existing design when no authorized
  // recommendations are currently published.

  if (!published.length) {
    return (
      <section
        className="t3-recommendations-empty"
        aria-label={c.sectionLabel}
      >
        <div
          className="t3-recommendations-symbol"
          aria-hidden="true"
        >
          “
        </div>

        <div>
          <h2>{c.emptyTitle}</h2>

          <p>{c.emptyLead}</p>

          <p className="t3-recommendations-footnote">
            {c.emptyNote}
          </p>

          {submissionLink}
        </div>
      </section>
    );
  }

  // ==========================================================
  // 7. Interactive professional recommendations carousel
  // ==========================================================

  // Only authorized public publication records are passed
  // to the client-side carousel.
  //
  // The carousel handles:
  // - Compact testimonial previews.
  // - Approximately 20% of the original text.
  // - Slow continuous horizontal scrolling.
  // - Automatic pause during interaction.
  // - Full recommendation dialog.
  // - LinkedIn icons and authorized profile links.
  // - Responsive layout and accessibility.
  //
  // Private submissions, email addresses, consent evidence
  // and administrative review data are never passed here.

  return (
    <>
      {submissionLink}

      <RecommendationsCarousel
        items={published}
        locale={locale}
      />
    </>
  );
}
