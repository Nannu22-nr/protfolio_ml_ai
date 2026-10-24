import Image from "next/image";
import type { Project } from "@/types";
import { AimscribeVisual } from "./AimscribeVisual";
import { AssistantVisual } from "./AssistantVisual";

/** Renders a verified preview image if provided, otherwise the project's custom illustration. */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.previewImage) {
    const { src, alt, width, height } = project.previewImage;
    return (
      <figure>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="h-auto w-full rounded-sm border border-line"
        />
      </figure>
    );
  }

  switch (project.visual) {
    case "aimscribe":
      return <AimscribeVisual />;
    case "assistant":
      return <AssistantVisual />;
    default:
      return null;
  }
}
