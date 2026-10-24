import type { ExperienceEntry } from "@/types";

/**
 * Source: supplied CV. Periods are only included where the CV states them.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "visual-content-manager",
    kind: "work",
    role: "Visual Content Manager",
    organization: "Global Travel Platform",
    points: [
      "Managed visual content operations for a global travel platform.",
      "Ensured content quality, consistency, and compliance with platform standards.",
      "Streamlined content publishing workflows by collaborating with cross-functional teams.",
    ],
  },
  {
    id: "fablab-operator",
    kind: "work",
    role: "Student Operator",
    organization: "FabLab, KUET",
    points: [
      "Operated 3D printers, laser cutters and CNC machines.",
      "Guided students on fabrication tools for engineering projects.",
    ],
  },
  {
    id: "bsc-bme",
    kind: "education",
    role: "B.Sc. in Biomedical Engineering",
    organization: "Khulna University of Engineering & Technology (KUET)",
    period: "2022 – 2026",
    points: [],
  },
  {
    id: "hsc",
    kind: "education",
    role: "Higher Secondary Education",
    organization: "Gangni Govt. Degree College",
    points: [],
  },
  {
    id: "krs-president",
    kind: "leadership",
    role: "President",
    organization: "KUET Research Society (KRS)",
    points: [],
  },
  {
    id: "durbar-autonomous-lead",
    kind: "leadership",
    role: "Autonomous Lead",
    organization: "Team Durbar (KUET Mars Rover)",
    points: [],
  },
  {
    id: "try-kuet-vp",
    kind: "leadership",
    role: "Vice President",
    organization: "TRY KUET",
    points: [],
  },
];
