import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070c",
          padding: 72,
          color: "#ffffff",
          border: "2px solid rgba(45,212,191,0.35)",
        }}
      >
        <div style={{ display: "flex", color: "#2dd4bf", fontSize: 26, letterSpacing: 6 }}>
          AI/ML · BIOMEDICAL ENGINEERING
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 24, fontSize: 38, color: "#94a3b8" }}>
            Engineering intelligence. Exploring biology.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
