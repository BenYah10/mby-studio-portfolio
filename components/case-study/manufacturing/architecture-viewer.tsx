"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

type ArchitectureViewerProps = {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  // Optional for legacy callers; localized views pass explicit translations.
  mapLabel?: string;
  closeLabel?: string;
  instructions?: string;
  onClose: () => void;
};

export default function ArchitectureViewer({
  isOpen,
  imageSrc,
  imageAlt,
  title,
  mapLabel = "Architecture Map",
  closeLabel = "Close viewer",
  instructions = "Scroll to explore the diagram. Press Escape to close.",
  onClose,
}: ArchitectureViewerProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex flex-col bg-[#07090d]/95 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* VIEWER HEADER */}
      <div className="flex shrink-0 items-center justify-between gap-6 border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
            {mapLabel}
          </p>

          <h2 className="mt-1 truncate text-sm font-semibold text-white/80 sm:text-base">
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* SCROLLABLE IMAGE AREA */}
      <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-5 lg:p-7">
        <div className="mx-auto min-w-[1100px] max-w-[1800px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1920}
              height={1080}
              sizes="100vw"
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* VIEWER FOOTER */}
      <div className="shrink-0 border-t border-white/10 px-4 py-3 text-center sm:px-6">
        <p className="text-xs leading-5 text-white/35">
          {instructions}
        </p>
      </div>
    </div>
  );
}