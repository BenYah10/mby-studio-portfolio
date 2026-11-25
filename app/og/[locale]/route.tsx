
/**
 * MBY Consulting — Localized Open Graph images
 *
 * Generates professional FR/EN social sharing images.
 * Reuses the existing official portrait.
 * No external services or credentials required.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale } from "@/i18n/config";
import { profile } from "@/content/profile";

export const runtime = "nodejs";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const portrait = await readFile(
    join(
      process.cwd(),
      "public",
      "images",
      "portrait",
      "mohamed-ben-yahmed-og.png"
    )
  );

  const portraitSrc =
  `data:image/png;base64,${portrait.toString("base64")}`;

  const fr = locale === "fr";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#edf3fa",
          borderTop: "16px solid #315f9c",
          padding: "48px 64px 36px",
          color: "#172b43",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#315f9c",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          MBY Consulting
        </div>

        <div
          style={{
            display: "flex",
            width: 88,
            height: 6,
            marginTop: 18,
            backgroundColor: "#315f9c",
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 650,
            }}
          >
            <div
              style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
        }}
>
              <span>Mohamed</span>
              <span>Ben Yahmed</span>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                color: "#315f9c",
              }}
            >
              {fr
                ? "Analyse d'affaires et fonctionnelle"
                : "Business & Functional Analysis"}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 23,
                color: "#52677e",
              }}
            >
              {fr
                ? "Systèmes · Processus · ERP"
                : "Systems · Processes · ERP"}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 360,
              height: 360,
              borderRadius: "50%",
              border: "3px solid #a5bfdf",
              padding: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={portraitSrc}
              alt={profile.name}
              width={326}
              height={326}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #c2d3e5",
            paddingTop: 24,
            fontSize: 22,
            color: "#315f9c",
          }}
        >
          <span>mbyconsulting.ca</span>
          <span>
            {fr
              ? "Portfolio professionnel"
              : "Professional portfolio"}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
