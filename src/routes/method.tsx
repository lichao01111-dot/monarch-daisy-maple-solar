import { createFileRoute } from "@tanstack/react-router";
import { formatBem, formatPct } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/method")({ component: MethodPage });

function MethodPage() {
  const { agg, c } = useView();
  const blocks = [
    { t: c.method1t, b: c.method1 },
    { t: c.method2t, b: c.method2 },
    { t: c.method3t, b: c.method3 },
    { t: c.method4t, b: c.method4 },
    { t: c.method5t, b: c.method5 },
  ];

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{c.methodTitle}</h1>
        <p className="mt-2 font-mono text-sm text-muted">{c.ecrFormula}</p>
      </header>
      <ol className="flex flex-col gap-3">
        {blocks.map((bl, i) => (
          <li key={bl.t} className="rounded-xl border border-line bg-surface p-5">
            <p className="font-mono text-[10px] tracking-[0.16em] text-faint">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-base font-medium">{bl.t}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{bl.b}</p>
          </li>
        ))}
      </ol>
      <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
        <h2 className="text-sm font-medium">{c.worked}</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <Row k={c.emission} v={`${formatBem(agg.emission, 1)} BEM`} />
          <Row k={c.acquired} v={`${formatBem(agg.acquired, 2)} BEM`} />
          <Row k={c.ecr} v={formatPct(agg.ecr)} />
          <Row k={c.naive} v={formatPct(agg.naiveEcr)} />
        </dl>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <p className="rounded-md bg-raised px-3 py-2 text-sm">
            <span className="text-muted">{c.counted}:</span> {c.acquired}
          </p>
          <p className="rounded-md bg-raised px-3 py-2 text-sm">
            <span className="text-muted">{c.notCounted}:</span> {c.retired}, {c.timeLocked}, {c.builderBounty}
          </p>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-2">
      <dt className="text-sm text-muted">{k}</dt>
      <dd className="font-mono text-sm tabular-nums">{v}</dd>
    </div>
  );
}
