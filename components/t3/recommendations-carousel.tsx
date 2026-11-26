"use client";

/**
 * MBY Consulting — Professional recommendations carousel
 * M08.05-E/F — Animated previews and detailed testimonials.
 *
 * Receives exclusively authorized public publication data.
 * No database access from the browser.
 */

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type {
  PublishedRecommendation,
} from "@/lib/recommendations-public-read";

import styles from "./recommendations-carousel.module.css";

// ============================================================
// 1. Bilingual interface
// ============================================================

const copy = {
  fr: {
    title: "Recommandations professionnelles",
    readMore: "Lire la recommandation",
    linkedIn: "Consulter le profil LinkedIn",
    previous: "Précédent",
    next: "Suivant",
    pause: "Mettre en pause",
    resume: "Reprendre le défilement",
    close: "Fermer",
    original: "Témoignage dans sa langue originale",
  },
  en: {
    title: "Professional recommendations",
    readMore: "Read the recommendation",
    linkedIn: "View LinkedIn profile",
    previous: "Previous",
    next: "Next",
    pause: "Pause",
    resume: "Resume scrolling",
    close: "Close",
    original: "Testimonial in its original language",
  },
} as const;

// ============================================================
// 2. Animation and preview settings
// ============================================================

const SCROLL_SPEED = 18; // Pixels per second
const PREVIEW_RATIO = 0.2;
const MAX_PREVIEW_LENGTH = 240;

function getExcerpt(quote: string): string {
  const text = quote.trim();

  const limit = Math.min(
    Math.ceil(text.length * PREVIEW_RATIO),
    MAX_PREVIEW_LENGTH
  );

  const fragment = text.slice(0, limit);
  const lastSpace = fragment.lastIndexOf(" ");

  const excerpt =
    lastSpace > limit * 0.7
      ? fragment.slice(0, lastSpace)
      : fragment;

  return `${excerpt.trimEnd()}…`;
}

// ============================================================
// 3. LinkedIn icon
// ============================================================

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <rect
        width="24"
        height="24"
        rx="4"
        fill="#0A66C2"
      />

      <path
        fill="#FFFFFF"
        d="M5 9h3v10H5V9zm1.5-4.5a1.7
        1.7 0 1 0 0 3.4 1.7 1.7 0 0 0
        0-3.4zM10 9h3v1.4c.6-1 1.5-1.7
        3-1.7 3.2 0 3.5 2.1 3.5
        4.8V19h-3v-4.8c0-1.2-.1-2.7-1.7-2.7
        -1.7 0-1.8 1.3-1.8 2.6V19h-3V9z"
      />
    </svg>
  );
}

// ============================================================
// 4. Main carousel component
// ============================================================

export function RecommendationsCarousel({
  items,
  locale,
}: {
  items: PublishedRecommendation[];
  locale: Locale;
}) {
  const c = copy[locale];

  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const duplicateRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const manualUntil = useRef(0);

  const selected =
    items.find(
      (item) => item.publication_id === selectedId
    ) ?? null;

  // Respect system accessibility preferences.

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () =>
      setReducedMotion(query.matches);

    update();

    query.addEventListener("change", update);

    return () =>
      query.removeEventListener("change", update);
  }, []);

  // Enable scrolling only when cards exceed available space.

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;

    if (!viewport || !group) return;

    const update = () => {
      setOverflow(
        items.length > 1 &&
        group.scrollWidth > viewport.clientWidth + 2
      );
    };

    const observer = new ResizeObserver(update);

    observer.observe(viewport);
    observer.observe(group);

    update();

    return () => observer.disconnect();
  }, [items.length]);

  const looping = overflow && !reducedMotion;

  // Continuous horizontal scrolling.

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    const duplicate = duplicateRef.current;

    if (
      !viewport ||
      !group ||
      !duplicate ||
      !looping ||
      paused ||
      hovered ||
      focused ||
      interacting ||
      selectedId
    ) {
      return;
    }

    let frame = 0;
    let lastTime = 0;
    let position = viewport.scrollLeft;

    function animate(time: number) {
      if (!viewport || !group || !duplicate) return;

      const delta = lastTime
        ? Math.min((time - lastTime) / 1000, 0.05)
        : 0;

      lastTime = time;

      if (
        document.hidden ||
        time < manualUntil.current
      ) {
        position = viewport.scrollLeft;
        frame = requestAnimationFrame(animate);
        return;
      }

      const loopWidth =
        duplicate.offsetLeft - group.offsetLeft;

      if (loopWidth > 0) {
        position += SCROLL_SPEED * delta;

        if (position >= loopWidth) {
          position %= loopWidth;
        }

        viewport.scrollLeft = position;
      }

      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [
    looping,
    paused,
    hovered,
    focused,
    interacting,
    selectedId,
  ]);

  // Open the accessible native dialog.

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (selected && !dialog.open) {
      dialog.showModal();
    } else if (!selected && dialog.open) {
      dialog.close();
    }
  }, [selected]);

  function move(direction: number) {
    const viewport = viewportRef.current;

    if (!viewport) return;

    manualUntil.current = performance.now() + 1500;

    viewport.scrollBy({
      left: direction * Math.min(
        340,
        viewport.clientWidth
      ),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  function closeDetails() {
    dialogRef.current?.close();
    setSelectedId(null);
  }

  function relationship(item: PublishedRecommendation) {
    return locale === "fr"
      ? item.display_relationship_fr
      : item.display_relationship_en;
  }

  // ==========================================================
  // 5. Compact preview card
  // ==========================================================

  function renderCard(
    item: PublishedRecommendation,
    duplicate = false
  ) {
    return (
      <article
        key={item.publication_id}
        className={styles.card}
      >
        <button
          type="button"
          className={styles.cardButton}
          tabIndex={duplicate ? -1 : 0}
          onClick={() =>
            setSelectedId(item.publication_id)
          }
          aria-label={`${c.readMore} — ${item.display_name}`}
        >
          <span
            className={styles.quoteMark}
            aria-hidden="true"
          >
            “
          </span>

          <span
            className={styles.excerpt}
            lang={item.original_language}
          >
            {getExcerpt(item.quote)}
          </span>

          <span className={styles.author}>
            {item.display_name}
          </span>

          {item.display_role && (
            <span className={styles.role}>
              {item.display_role}
            </span>
          )}

          {relationship(item) && (
            <span className={styles.role}>
              {relationship(item)}
            </span>
          )}

          <span className={styles.readMore}>
            {c.readMore} ↗
          </span>
        </button>

        <a
          className={styles.linkedin}
          href={item.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={duplicate ? -1 : 0}
          aria-label={
            `${c.linkedIn} — ${item.display_name}`
          }
          title={c.linkedIn}
        >
          <LinkedInIcon />
        </a>
      </article>
    );
  }

  // ==========================================================
  // 6. Carousel and complete recommendation dialog
  // ==========================================================

  return (
    <section
      className={styles.carousel}
      aria-label={c.title}
    >
      <div
        ref={viewportRef}
        className={styles.viewport}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget
            )
          ) {
            setFocused(false);
          }
        }}
        onPointerDown={() => setInteracting(true)}
        onPointerUp={() => setInteracting(false)}
        onPointerCancel={() => setInteracting(false)}
        onPointerLeave={() => setInteracting(false)}
        onWheel={() => {
          manualUntil.current =
            performance.now() + 1500;
        }}
      >
        <div
          className={`${styles.track} ${
            overflow ? "" : styles.centered
          }`}
        >
          <div
            ref={groupRef}
            className={styles.group}
          >
            {items.map((item) => renderCard(item))}
          </div>

          {looping && (
            <div
              ref={duplicateRef}
              className={styles.group}
              aria-hidden="true"
            >
              {items.map((item) =>
                renderCard(item, true)
              )}
            </div>
          )}
        </div>
      </div>

      {overflow && (
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={c.previous}
            title={c.previous}
          >
            ←
          </button>

          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? c.resume : c.pause}
              title={paused ? c.resume : c.pause}
            >
              {paused ? "▶" : "Ⅱ"}
            </button>
          )}

          <button
            type="button"
            onClick={() => move(1)}
            aria-label={c.next}
            title={c.next}
          >
            →
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="mby-recommendation-dialog-title"
        onClose={() => setSelectedId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDetails();
          }
        }}
      >
        {selected && (
          <div className={styles.dialogContent}>
            <button
              type="button"
              className={styles.close}
              onClick={closeDetails}
              aria-label={c.close}
              autoFocus
            >
              ×
            </button>

            <p className={styles.dialogLabel}>
              {c.title}
            </p>

            <span
              className={styles.quoteMark}
              aria-hidden="true"
            >
              “
            </span>

            <h2 id="mby-recommendation-dialog-title">
              {selected.display_name}
            </h2>

            {[
              selected.display_role,
              selected.display_organization,
              selected.display_industry_sector,
              relationship(selected),
            ]
              .filter(Boolean)
              .map((value, index) => (
                <p
                  key={index}
                  className={styles.role}
                >
                  {value}
                </p>
              ))}

            <blockquote
              className={styles.fullQuote}
              lang={selected.original_language}
            >
              {selected.quote}
            </blockquote>

            <p className={styles.original}>
              {c.original}
            </p>

            <a
              className={styles.profileLink}
              href={selected.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              {c.linkedIn}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}