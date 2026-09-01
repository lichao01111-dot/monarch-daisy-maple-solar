import { createFileRoute } from "@tanstack/react-router";
import { formatBem } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/circulation")({ component: CirculationPage });

function CirculationPage() {
  const { agg, c } = useView();
  const rows = [
    { k: c.supplyStart, v: agg.supplyStart },
    { k: `+ ${c.emission}`, v: agg.emission },
    { k: `− ${c.retired}`, v: -agg.dest.retired },
    { k: c.supplyEnd, v: agg.supplyEnd, bold: true },
    { k: c.locked, v: agg.lockedEnd },
    { k: c.burned, v: agg.burnedEnd },
  ];

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{c.navCirculation}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">{c.v2Pending}</p>
      </header>
      <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
        <ul className="flex flex-col">
          {rows.map((r) => (
            <li
              key={r.k}
              className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0"
            >
              <span className="text-sm text-muted">{r.k}</span>
              <span
                className={`font-mono tabular-nums ${r.bold ? "text-xl text-fg" : "text-base"}`}
              >
                {formatBem(r.v, 1)}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <Tile label={c.processor} value={formatBem(agg.processorSink, 1)} />
        <Tile label={c.bnn} value={formatBem(agg.bnnSink, 1)} />
        <Tile label={c.minerSells} value={formatBem(agg.minerSells, 1)} />
      </section>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-mono text-2xl tabular-nums">{value}</p>
    </div>
  );
}
