import type { ResearchEntry } from "@/types";

/**
 * Research entries are limited to work described in the CV.
 * No publications, DOIs, citations, co-authors or results are claimed.
 * `results` stays empty until figures are verified and can be cited.
 */
export const research: ResearchEntry[] = [
  {
    id: "bci-eeg-intent",
    title: "EEG-based brain–computer interface for patient intent prediction",
    status: "applied-project",
    statusNote: "Project work described in the CV. No publication is claimed.",
    question:
      "Can deep learning on EEG signals decode what a patient who cannot speak is trying to communicate?",
    methodology:
      "Deep learning applied to EEG biosignals to predict communication intent, bridging biological intelligence and AI.",
    results: [],
    figure: "eeg",
    limitations:
      "Datasets, model architecture and evaluation metrics are not stated in the CV and are therefore not reported here.",
    futureDirections: "To be documented when a verified write-up is available.",
    tags: ["EEG", "Biosignals", "Deep learning", "BCI"],
  },
  {
    id: "brain-tumor-mri",
    title: "Brain tumor segmentation from MRI scans",
    status: "applied-project",
    statusNote: "Part of the 'Medical AI: Prescription OCR + Brain Tumor Detection' project in the CV.",
    question: "Can a deep learning pipeline segment brain tumors from MRI to support faster, more accurate clinical decisions?",
    methodology: "Deep learning segmentation pipeline applied to MRI scans.",
    results: [],
    figure: "tumor",
    limitations:
      "No segmentation metrics, datasets or clinical validation are stated, so none are reported. Not a diagnostic tool.",
    futureDirections: "To be documented when a verified write-up is available.",
    tags: ["Medical imaging", "Segmentation", "MRI"],
  },
  {
    id: "rna-structure",
    title: "Genome / RNA structure and function prediction",
    status: "applied-project",
    statusNote: "Project work described in the CV. No publication is claimed.",
    question: "Can deep learning on genomic sequences predict structural and functional RNA properties?",
    methodology: "Deep learning applied to genomic sequences to predict structural and functional RNA properties.",
    results: [],
    figure: "rna",
    limitations:
      "Models, datasets and benchmarks are not stated in the CV and are therefore not reported here.",
    futureDirections: "To be documented when a verified write-up is available.",
    tags: ["Bioinformatics", "Genomics", "RNA", "Deep learning"],
  },
];

export const researchStatusLabels: Record<ResearchEntry["status"], string> = {
  published: "Published",
  ongoing: "Ongoing research",
  proposed: "Proposed idea",
  "applied-project": "Applied project · unpublished",
};
