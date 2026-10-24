import { projectUrls } from "@/config/site";
import type { Project } from "@/types";

/**
 * Project registry.
 *
 * To add a project: append an object to `projects`. No layout edits are needed.
 *  - `featured: true`  → large showcase + case-study page at /projects/<slug>
 *  - `featured: false` → compact entry in the project index
 *  - `visible: false`  → hidden from the public UI (use for drafts / unverified items)
 *
 * Only add `repoUrl`, `metrics` or result claims once verified.
 */
export const projects: Project[] = [
  {
    slug: "aimscribe",
    title: "AIMScribe",
    subtitle: "Clinical NLP Recommender",
    category: "Medical NLP · Clinical AI",
    summary:
      "A deployed clinical NLP recommender application, hosted on Streamlit. Open the live app to see exactly what it does.",
    technologies: ["Python", "NLP", "Streamlit"],
    liveUrl: projectUrls.aimscribe,
    liveLabel: "Live Demo",
    visual: "aimscribe",
    featured: true,
    visible: true,
    provenance:
      "The application could not be inspected automatically (the host blocks automated access), so this entry describes it only at the level of its title, category and hosting. Detailed claims are intentionally withheld until verified.",
    caseStudy: [
      {
        id: "problem",
        title: "Problem",
        status: "pending",
        body: ["Problem statement not yet documented. Add a verified description in src/data/projects.ts."],
      },
      {
        id: "approach",
        title: "Approach",
        status: "pending",
        body: ["Modeling approach not yet documented. Add the verified NLP method and data sources."],
      },
      {
        id: "architecture",
        title: "Architecture",
        status: "pending",
        body: ["Architecture not yet documented. The application is deployed on Streamlit Community Cloud."],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        status: "pending",
        body: ["No evaluation results are reported. Metrics will be added only when they can be verified."],
      },
      {
        id: "limitations",
        title: "Limitations",
        status: "verified",
        source: "Portfolio author's editorial position",
        body: [
          "This page does not describe model internals, datasets or accuracy, because they have not been verified for publication.",
          "Outputs of a clinical NLP recommender are not medical advice and must not replace review by a qualified clinician.",
        ],
      },
    ],
  },
  {
    slug: "medical-ai-assistant",
    title: "Medical AI Assistant",
    subtitle: "Smart AI — Advanced Medical Assistant",
    category: "Medical AI · Conversational assistant",
    summary:
      "A deployed web assistant that combines AI chat with voice consultation, symptom analysis, medical image analysis, wearable vitals, mental-health screening, medication reminders and more.",
    highlights: [
      "Voice consultation with speech transcription in multiple languages and browser read-aloud",
      "Symptom analyzer and medical image analysis (X-ray, MRI, CT, ultrasound) for informational use",
      "Smartwatch vitals via Web Bluetooth, plus manual vitals entry",
      "PHQ-9 and GAD-7 screening, mood journal, medication reminders and pill identification",
      "Emergency SOS with an OpenStreetMap hospital locator, nutrition planner, drug-interaction checker, health-record analyzer and risk assessments",
    ],
    technologies: ["Groq AI APIs", "Web Bluetooth", "OpenStreetMap", "Browser TTS & Notifications"],
    liveUrl: projectUrls.medicalAssistant,
    liveLabel: "Try Live Demo",
    visual: "assistant",
    featured: true,
    visible: true,
    provenance:
      "Feature list and technology notes are taken from the live application's own page. The portfolio makes no clinical-accuracy claims.",
    caseStudy: [
      {
        id: "problem",
        title: "Problem",
        status: "verified",
        source: "Live application page",
        body: [
          "The application positions itself as an AI medical assistant offering 'intelligent healthcare solutions' in a single web interface, covering consultation, monitoring, screening and emergency support.",
        ],
      },
      {
        id: "system-design",
        title: "System design",
        status: "verified",
        source: "Live application page",
        body: [
          "A single-page web interface with a module for each capability: Chat, Voice, Symptoms, X-Ray/MRI, Wearable, Mental Health, Medications, 2nd Opinion, Emergency, Nutrition, Drugs, Records and Risk.",
          "According to the app, language and vision features are powered by Groq AI and free APIs; voice transcription uses Groq Whisper, replies can be read aloud with browser text-to-speech, and image analysis uses a Groq Llama Vision model.",
          "Smartwatch connection uses the Web Bluetooth API (Chrome/Edge only), medication reminders use the browser Notification API, and the hospital locator uses OpenStreetMap data with no API key.",
        ],
      },
      {
        id: "implementation",
        title: "Implementation",
        status: "verified",
        source: "Live application page",
        body: [
          "Deployed on Render at medical-assistant-nannu.onrender.com. The page states that uploaded health records are processed in memory and not stored permanently.",
          "Source code is not linked from this portfolio until a repository is verified.",
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        status: "pending",
        body: [
          "No accuracy figures, benchmarks, user statistics or clinical validation are reported. None have been verified for publication.",
        ],
      },
      {
        id: "limitations",
        title: "Limitations",
        status: "verified",
        source: "Disclaimers shown in the live application",
        body: [
          "The app states that AI image analysis is informational only and must be reviewed by a qualified radiologist; that the second-opinion feature does not replace a physician; and that pill identification is for reference and should be confirmed with a pharmacist.",
          "Wearable connection depends on Web Bluetooth, which is available only in Chrome and Edge. This project is not a clinically validated diagnostic system and has no medical approval.",
        ],
      },
    ],
  },

  // ---- Project index: work described in the CV (no live links, no metrics) ----
  {
    slug: "bci-eeg-intent",
    title: "Brain–Computer Interface: EEG-Based Patient Intent Prediction",
    category: "Biosignals · Deep learning",
    summary:
      "An AI-driven BCI that decodes EEG signals to predict what a patient is trying to communicate, giving patients who cannot speak a way to be understood.",
    technologies: ["EEG", "Deep learning"],
    visual: "none",
    group: "medical",
    details: {
      problem: "Patients who cannot speak still have intent. The aim is to read that intent from brain activity so they can be understood without speech.",
      pipeline: ["EEG recording", "Filtering & windowing", "Deep learning model", "Intent prediction"],
      demonstrates: ["EEG / biosignal preprocessing", "Time-series deep learning", "Assistive, patient-centred design"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "prescription-ocr-tumor",
    title: "Medical AI: Prescription OCR + Brain Tumor Detection",
    category: "Medical imaging · OCR",
    summary:
      "AI models that digitize handwritten prescriptions via OCR, and a deep learning pipeline that segments brain tumors from MRI scans.",
    technologies: ["OCR", "Deep learning", "MRI"],
    visual: "none",
    group: "medical",
    details: {
      problem: "Handwritten prescriptions are slow to digitize and MRI review is time-intensive. Both benefit from AI support that is faster and more consistent.",
      pipeline: ["Scan / image input", "Preprocessing", "OCR & segmentation models", "Digital output"],
      demonstrates: ["Medical image analysis", "Segmentation of MRI", "Document OCR for handwriting"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "content-generation",
    title: "AI Content Generation & Conversational Systems",
    category: "Generative AI",
    summary:
      "An AI chatbot with 3D avatar interaction, real-time lip-sync and live call support using LangChain/LangGraph, extended with a diffusion-based pipeline that turns text prompts into images and short videos with live streaming.",
    technologies: ["LangChain", "LangGraph", "Diffusion models"],
    visual: "none",
    group: "generative",
    details: {
      problem: "Conversational systems feel more natural when they can be seen, heard and answered in real time, and when they can create media from plain text.",
      pipeline: ["User prompt", "LangChain / LangGraph agent", "3D avatar & lip-sync", "Live call \u00b7 image & video output"],
      demonstrates: ["Agent orchestration with LangChain / LangGraph", "Real-time interaction design", "Diffusion-based generation"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "yolo-traffic",
    title: "Real-Time Object Detection & Traffic Intelligence",
    category: "Computer vision",
    summary:
      "YOLO-based systems for real-time detection of vehicles, pedestrians and obstacles for adaptive traffic control, with a Global Attention Mechanism (GAM) integrated into the YOLO architecture to improve accuracy in complex scenes.",
    technologies: ["YOLO", "GAM", "OpenCV"],
    visual: "none",
    group: "vision",
    details: {
      problem: "Fixed-timing traffic control cannot react to what is actually on the road. Detecting vehicles, pedestrians and obstacles lets control adapt.",
      pipeline: ["Camera frames", "YOLO + GAM detector", "Vehicles \u00b7 pedestrians \u00b7 obstacles", "Adaptive traffic control"],
      demonstrates: ["Real-time object detection", "Attention mechanisms in CNN detectors", "OpenCV video pipelines"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "rna-structure-function",
    title: "Genome / RNA Structure & Function Prediction",
    category: "Bioinformatics",
    summary:
      "Deep learning applied to genomic sequences to predict structural and functional RNA properties, supporting biological research.",
    technologies: ["Deep learning", "Genomics"],
    visual: "none",
    group: "medical",
    details: {
      problem: "RNA function depends on its structure, which is costly to determine experimentally. Sequence-based prediction can support biological research.",
      pipeline: ["Genomic sequence", "Sequence encoding", "Deep learning model", "Structure & function prediction"],
      demonstrates: ["Bioinformatics", "Sequence modeling", "Applying deep learning to biology"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "big-data-reports",
    title: "Big Data Analysis & Automated Report Generation",
    category: "Data analytics",
    summary:
      "A pipeline to process and analyze large datasets and automatically generate structured, decision-ready reports, reducing manual effort.",
    technologies: ["Python", "Data pipelines"],
    visual: "none",
    group: "data",
    details: {
      problem: "Analysts lose time turning large datasets into readable reports by hand. Automating the path from raw data to a structured report reduces that effort.",
      pipeline: ["Large datasets", "Processing & analysis", "Report generation", "Decision-ready report"],
      demonstrates: ["Data pipelines in Python", "Large-scale data analysis", "Automated, structured reporting"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "virtual-try-on",
    title: "Real-Time Virtual Clothing Try-On",
    category: "Computer vision",
    summary:
      "A real-time virtual try-on system using pose estimation and garment alignment to deliver instant digital outfit previews.",
    technologies: ["Pose estimation", "Computer vision"],
    visual: "none",
    group: "vision",
    details: {
      problem: "Shoppers want to see how clothes look before buying. A live preview that follows the body makes that possible instantly.",
      pipeline: ["Camera feed", "Pose estimation", "Garment alignment", "Instant outfit preview"],
      demonstrates: ["Pose estimation", "Real-time computer vision", "Geometric alignment of overlays"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "crop-disease-detection",
    title: "Smartphone Crop Disease Detection & Instant Reporting",
    category: "Applied vision · Agriculture",
    summary:
      "A smartphone-based tool for farmers that detects crop diseases from a photo during cultivation and instantly generates a diagnosis report.",
    technologies: ["Computer vision", "Mobile"],
    visual: "none",
    group: "vision",
    details: {
      problem: "Farmers often meet crop disease in the field without quick expert access. A photo-based tool can give a diagnosis report on the spot.",
      pipeline: ["Phone photo", "Disease detection", "Diagnosis report", "Instant result for the farmer"],
      demonstrates: ["Applied computer vision", "Mobile-first tooling", "Turning model output into a readable report"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "voice-cloning",
    title: "Real-Time Voice Cloning",
    category: "Speech synthesis",
    summary:
      "A real-time voice cloning system that reproduces a speaker's voice from short audio samples, applying deep learning for speech synthesis.",
    technologies: ["Deep learning", "Speech synthesis"],
    visual: "none",
    group: "generative",
    details: {
      problem: "Reproducing a speaker's voice normally needs long recordings. Short samples and deep learning make real-time synthesis practical.",
      pipeline: ["Short audio sample", "Speaker representation", "Speech synthesis", "Cloned voice in real time"],
      demonstrates: ["Deep learning for speech", "Voice synthesis", "Real-time audio processing"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "rrt-path-planning",
    title: "Complex Terrain Path Planning (RRT)",
    category: "Robotics",
    summary:
      "A dynamic RRT-based path-planning algorithm for autonomous navigation in obstacle-rich environments, with real-time avoidance and adaptability to changing terrain.",
    technologies: ["RRT", "Path planning", "ROS"],
    visual: "none",
    group: "robotics",
    details: {
      problem: "Autonomous robots must move through cluttered, changing terrain. Sampling-based planning finds routes that adapt as obstacles appear.",
      pipeline: ["Map & obstacles", "RRT tree expansion", "Real-time avoidance", "Path adapted to terrain"],
      demonstrates: ["Rapidly-exploring Random Trees", "Obstacle avoidance", "ROS-based robotics"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
  {
    slug: "line-follow-robot",
    title: "Line Follow Robotics",
    category: "Robotics",
    summary:
      "An autonomous robot that follows predefined tracks using sensor feedback and control algorithms, keeping navigation smooth and accurate across variable track conditions.",
    technologies: ["Sensors", "Control algorithms"],
    visual: "none",
    group: "robotics",
    details: {
      problem: "A robot that follows a track must correct itself continuously. Sensor feedback and control keep its motion smooth across changing conditions.",
      pipeline: ["Sensor readings", "Control algorithm", "Motor correction", "Smooth track following"],
      demonstrates: ["Sensor feedback", "Control algorithms", "Embedded autonomy"],
    },
    featured: false,
    visible: true,
    provenance: "Supplied CV.",
  },
];

export const projectGroups: Array<{ id: "all" | NonNullable<Project["group"]>; label: string }> = [
  { id: "all", label: "All" },
  { id: "medical", label: "Medical & bio" },
  { id: "vision", label: "Computer vision" },
  { id: "generative", label: "Generative & speech" },
  { id: "data", label: "Data" },
  { id: "robotics", label: "Robotics" },
];

export const visibleProjects = projects.filter((p) => p.visible);
export const featuredProjects = visibleProjects.filter((p) => p.featured);
export const indexProjects = visibleProjects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return visibleProjects.find((p) => p.slug === slug && p.featured);
}
