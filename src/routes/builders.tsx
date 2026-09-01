import { createFileRoute } from "@tanstack/react-router";
import { BuilderTable } from "@/components/board/builder-table";
import { formatBem, formatInt } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/builders")({ component: BuildersPage });

function BuildersPage() {
  const { agg, lang, c } = useView();
  const bounty = agg.dest.builderBounty;
  const taped = agg.circuits;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{c.navBuilders}</h1>
      </header>
      <div className="grid gap-3 sm:grid-cols-3">
        <Tile label={c.circuits} value={formatInt(taped)} />
        <Tile label={c.transistors} value={formatInt(agg.nand + agg.latch)} />
        <Tile label={c.bounty} value={`${formatBem(bounty, 2)} BEM`} />
      </div>
      <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
        <BuilderTable rows={agg.builders} lang={lang} />
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
