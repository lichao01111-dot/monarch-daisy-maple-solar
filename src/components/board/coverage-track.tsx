import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatPct } from "@/lib/format";

export function CoverageTrack({
  ecr,
  ghost,
  label,
  ghostLabel,
}: {
  ecr: number;
  ghost?: number;
  label: string;
  ghostLabel?: string;
}) {
  const pct = Math.max(0, Math.min(1, ecr));
  const ghostPct = ghost !== undefined ? Math.max(0, Math.min(1, ghost)) : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3 text-xs text-muted">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-fg">{formatPct(ecr)}</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-xs bg-raised">
        {ghost !== undefined && ghostPct > pct && (
          <div
            className="absolute inset-y-0 left-0 bg-fg/20"
            style={{ width: `${ghostPct * 100}%` }}
          />
        )}
        <div
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: `${pct * 100}%` }}
        />
        <Ticks />
      </div>
      {ghost !== undefined && ghostLabel ? (
        <p className="text-xs text-faint">
          {ghostLabel}{" "}
          <span className="font-mono tabular-nums text-muted">
            {formatPct(ghost)}
          </span>
        </p>
      ) : null}
    </div>
  );
}

function Ticks() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full text-bg/40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 21 }, (_, i) => (
        <line
          key={i}
          x1={`${(i / 20) * 100}%`}
          x2={`${(i / 20) * 100}%`}
          y1={i % 5 === 0 ? "0" : "40%"}
          y2="100%"
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-line bg-surface p-5 shadow-panel md:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}
