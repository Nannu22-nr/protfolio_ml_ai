import type { SiteLinks } from "@/types";

/**
 * Central site configuration.
 * Edit values here; every component reads from this file.
 * Set a link to `null` to hide it everywhere.
 */
export const siteConfig = {
  name: "Ohidul Alam",
  shortName: "OA",
  role: "AI/ML Engineer · Biomedical Engineering",
  title: "Ohidul Alam — AI/ML Engineer & Biomedical Engineer",
  description:
    "Portfolio of Ohidul Alam: deep learning, medical AI, EEG/biosignal analysis, computer vision and genomic data modeling. Biomedical Engineering, KUET.",
  /** Public site URL (from the CV). Update if you add a custom domain. */
  url: "https://protfolio-ohidul.vercel.app",
  location: "Meherpur, Khulna, Bangladesh",
  locale: "en_US",
} as const;

export const links: SiteLinks = {
  // Source: CV header.
  email: "nannuohidul@gmail.com",
  // Source: CV header.
  github: "https://github.com/Nannu22-nr",
  // Source: LinkedIn link shown on the author's own Medical AI Assistant app.
  // Not listed on the CV — verify it is current, or set to null to hide it.
  linkedin: "https://www.linkedin.com/in/ohidul-alam-54123a287",
  // PDF generated from the supplied CV. Replace the file in /public/resume to update.
  resume: "/resume/Ohidul_Alam_CV.pdf",
  // Source: CV header.
  portfolioLive: "https://protfolio-ohidul.vercel.app/",
};

/** Exact live application URLs. Change them here only. */
export const projectUrls = {
  aimscribe: "https://aimscribe.streamlit.app/",
  medicalAssistant: "https://medical-assistant-nannu.onrender.com/",
} as const;
