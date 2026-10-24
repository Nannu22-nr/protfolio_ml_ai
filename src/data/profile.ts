import type { SkillGroup } from "@/types";

/** Every statement below is taken from the supplied CV. */
export const profile = {
  headline: {
    line1: "Engineering intelligence.",
    line2: "Exploring biology.",
  },
  intro:
    "AI/ML engineer and Biomedical Engineering student at KUET, building deep learning systems for medical imaging, EEG biosignals, computer vision and genomic data.",
  objective:
    "Biomedical engineer with hands-on experience in deep learning, computer vision, generative AI, EEG/biosignal analysis and genomic data modeling, seeking an AI/ML or Data Analytics role to build intelligent, data-driven solutions that turn complex data into real-world impact.",
  aboutParagraphs: [
    "My background is Biomedical Engineering at Khulna University of Engineering & Technology (KUET, 2022–2026), with hands-on work across medical AI, clinical imaging, EEG-based brain-computer interfaces, computer vision, generative AI and bioinformatics.",
    "As President of KUET Research Society and a FabLab operator, I have led teams, guided students and collaborated across disciplines.",
  ],
  focusAreas: [
    { label: "Medical imaging & clinical AI", detail: "Brain tumor segmentation from MRI, prescription OCR" },
    { label: "EEG / biosignals", detail: "Brain–computer interface for patient intent prediction" },
    { label: "Computer vision", detail: "YOLO-based detection with Global Attention Mechanism" },
    { label: "Genomics", detail: "RNA structure and function prediction" },
  ],
  certifications: [
    { title: "Deep Learning Certification", issuer: "Great Learning" },
    { title: "100% Attendance Certificate", issuer: "Awarded by KUET for full attendance in 2 semesters" },
    { title: "Hands-on Training using Fabrication Tools", issuer: "FabLab KUET" },
  ],
} as const;

export const skillGroups: SkillGroup[] = [
  { label: "Programming", items: ["Python", "JavaScript", "MATLAB", "C", "R"] },
  {
    label: "Machine & deep learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Vision Transformer (ViT)",
      "YOLO",
      "AlexNet",
      "EfficientNet",
      "ONNX",
      "TensorFlow Lite",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "FastAPI",
    ],
  },
  { label: "Computer vision", items: ["OpenCV", "Image Processing", "Object Detection"] },
  { label: "Data & analytics", items: ["Big Data Analysis", "Automated Report Generation", "Speech/Voice Synthesis"] },
  { label: "Software & tools", items: ["Google Colab", "Kaggle Notebooks", "Streamlit", "Flask", "ROS", "PowerPoint"] },
  {
    label: "Domain knowledge",
    items: [
      "Biomedical engineering",
      "Medical imaging & clinical AI",
      "EEG/biosignal processing",
      "Bioinformatics",
      "Healthcare technology",
    ],
  },
];
