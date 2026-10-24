"use client";

import { useState } from "react";
import { pipelines } from "@/data/lab";
import { cn } from "@/lib/utils";

/** Interactive illustration of two common ML system patterns. Not a verified implementation. */
export function PipelineExplorer() {
  const [pipelineId, setPipelineId] = useState(pipelines[0]?.id ?? "");
  const [stageId, setStageId] = useState<string>(pipelines[0]?.stages[0]?.id ?? "");

  const pipeline = pipelines.find((p) => p.id === pipelineId) ?? pipelines[0];
  if (!pipeline) return null;
  const stage = pipeline.stages.find((s) => s.id === stageId) ?? pipeline.stages[0];
  if (!stage) return null;

  return (
    <div className="border border-line bg-navy-800">
      <div className="flex flex-wrap gap-2 border-b border-line p-4" role="group" aria-label="Choose a diagram">
        {pipelines.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={p.id === pipelineId}
            onClick={() => {
              setPipelineId(p.id);
              setStageId(p.stages[0]?.id ?? "");
            }}
            className={cn(
              "min-h-[44px] rounded-sm border px-4 text-sm transition-colors",
              p.id === pipelineId ? "border-signal bg-signal/10 text-signal" : "border-line text-slate-400 hover:text-white",
            )}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        <p className="font-mono text-xs text-slate-500">{pipeline.description}</p>

        <ol className="mt-5 grid gap-2 sm:flex sm:items-stretch sm:gap-0" aria-label={`${pipeline.title} stages`}>
          {pipeline.stages.map((s, i) => {
            const active = s.id === stage.id;
            return (
              <li key={s.id} className="flex flex-1 items-stretch sm:items-center">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStageId(s.id)}
                  className={cn(
                    "min-h-[56px] flex-1 border px-3 py-2 text-left text-sm transition-colors sm:text-center",
                    active ? "border-signal bg-signal/10 text-white" : "border-line text-slate-400 hover:border-slate-500 hover:text-white",
                  )}
                >
                  <span className="mr-2 font-mono text-[10px] text-slate-600 sm:block">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </button>
                {i < pipeline.stages.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px w-4 shrink-0 bg-signal/50 sm:block" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 border-t border-line pt-5" aria-live="polite">
          <p className="font-medium text-white">{stage.label}</p>
          <p className="mt-1 text-sm text-slate-400">{stage.summary}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {stage.notes.map((n) => (
              <li key={n} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-label text-slate-500 sm:px-6">
        Illustrative diagram · generic pattern · not a specific project
      </p>
    </div>
  );
}
