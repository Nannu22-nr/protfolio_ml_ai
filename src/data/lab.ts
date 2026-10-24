/**
 * Technical Lab content.
 * All diagrams are generic ILLUSTRATIONS of common patterns, not descriptions of a verified implementation.
 */
export interface PipelineStage {
  id: string;
  label: string;
  summary: string;
  notes: string[];
}

export interface PipelineDefinition {
  id: string;
  title: string;
  description: string;
  stages: PipelineStage[];
}

export const pipelines: PipelineDefinition[] = [
  {
    id: "inference",
    title: "Model inference pipeline",
    description: "Input → Preprocessing → Model Inference → Post-processing → Output",
    stages: [
      {
        id: "input",
        label: "Input",
        summary: "Raw data enters the system.",
        notes: [
          "Examples: an image, an EEG segment, a text string or a genomic sequence.",
          "Validate type, size and shape before anything else runs.",
        ],
      },
      {
        id: "pre",
        label: "Preprocessing",
        summary: "Make the data match what the model expects.",
        notes: [
          "Resize or window the data, normalize values, tokenize text, filter noise from signals.",
          "Training and serving must use identical preprocessing to avoid skew.",
        ],
      },
      {
        id: "model",
        label: "Model inference",
        summary: "The trained network produces raw outputs.",
        notes: [
          "A forward pass in PyTorch, TensorFlow, ONNX Runtime or TensorFlow Lite.",
          "Exporting to ONNX or TFLite can make deployment lighter on constrained devices.",
        ],
      },
      {
        id: "post",
        label: "Post-processing",
        summary: "Turn raw outputs into something usable.",
        notes: [
          "Apply thresholds, non-maximum suppression, softmax, label mapping or mask clean-up.",
          "Attach confidence information and flag low-confidence outputs for human review.",
        ],
      },
      {
        id: "output",
        label: "Output",
        summary: "A structured result for a person or another system.",
        notes: [
          "Return JSON, an annotated image or a generated report.",
          "In medical contexts, present outputs as decision support, not as a diagnosis.",
        ],
      },
    ],
  },
  {
    id: "request",
    title: "API request lifecycle",
    description: "Frontend → Backend API → Model Service → Response",
    stages: [
      {
        id: "frontend",
        label: "Frontend",
        summary: "The user interface collects input.",
        notes: [
          "Validates input on the client and sends an HTTP request.",
          "Shows loading and error states; never contains secret keys.",
        ],
      },
      {
        id: "api",
        label: "Backend API",
        summary: "A service such as FastAPI receives the request.",
        notes: [
          "Authenticates, validates the payload against a schema and applies rate limits.",
          "Keeps API keys in server-side environment variables.",
        ],
      },
      {
        id: "service",
        label: "Model service",
        summary: "The model or a hosted AI API is called.",
        notes: [
          "Runs local inference or forwards the request to a hosted model provider.",
          "Handles timeouts and retries so one slow call does not block the app.",
        ],
      },
      {
        id: "response",
        label: "Response",
        summary: "Results travel back to the interface.",
        notes: [
          "The API normalizes the output into a stable JSON contract.",
          "The frontend renders it with appropriate disclaimers and error handling.",
        ],
      },
    ],
  },
];
