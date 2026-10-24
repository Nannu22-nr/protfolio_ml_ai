/** Shared content types. All site content is typed here and stored in /src/data. */

export type VerificationStatus = "verified" | "pending";

export interface CaseStudySection {
  id: string;
  title: string;
  status: VerificationStatus;
  /** Paragraphs. For `pending` sections these describe what still needs to be written. */
  body: string[];
  /** Where the statements come from (e.g. "Live application page"). */
  source?: string;
}

export interface VerifiedMetric {
  label: string;
  value: string;
  source: string;
}

export type ProjectVisualKey = "aimscribe" | "assistant" | "none";

export type ProjectGroup = "medical" | "vision" | "generative" | "data" | "robotics";

/** Expanded write-up for index projects. Generalised from the CV description: no models, datasets or metrics are claimed. */
export interface ProjectDetails {
  /** The need the project responds to. */
  problem: string;
  /** Short stage labels describing the general flow of the system. */
  pipeline: string[];
  /** Skills and ideas the project demonstrates. */
  demonstrates: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  summary: string;
  /** Verified capabilities (only statements backed by the live app or the CV). */
  highlights?: string[];
  technologies: string[];
  liveUrl?: string;
  liveLabel?: string;
  /** Add only when the repository is verified. */
  repoUrl?: string;
  /** Path under /public, e.g. "/images/projects/foo.webp". Needs a width/height. */
  previewImage?: { src: string; alt: string; width: number; height: number };
  /** Key of a custom SVG/HTML illustration in components/visuals. */
  visual: ProjectVisualKey;
  /** Shown as a large featured showcase with its own case-study page. */
  featured: boolean;
  /** Set to false to hide an entry from the public UI without deleting it. */
  visible: boolean;
  /** Short note about where the information comes from. */
  provenance: string;
  /** Filter group for the "All projects" section. */
  group?: ProjectGroup;
  /** Expanded write-up shown in the "All projects" section. */
  details?: ProjectDetails;
  metrics?: VerifiedMetric[];
  caseStudy?: CaseStudySection[];
}

export type ResearchStatus = "published" | "ongoing" | "proposed" | "applied-project";

export interface ResearchEntry {
  id: string;
  title: string;
  status: ResearchStatus;
  statusNote: string;
  question: string;
  methodology: string;
  /** Leave empty unless results are verified. */
  results: string[];
  figure: "eeg" | "tumor" | "rna";
  paperUrl?: string;
  repoUrl?: string;
  limitations: string;
  futureDirections: string;
  tags: string[];
}

export interface ExperienceEntry {
  id: string;
  kind: "work" | "education" | "leadership";
  role: string;
  organization: string;
  /** Only filled when the CV states it. */
  period?: string;
  points: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SiteLinks {
  email: string | null;
  github: string | null;
  linkedin: string | null;
  resume: string | null;
  portfolioLive: string | null;
}
