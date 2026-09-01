import { createFileRoute } from "@tanstack/react-router";
import { SeriesChart } from "@/components/board/series-chart";
import { formatBem, formatDay, formatInt } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/emission")({ component: EmissionPage });

function EmissionPage() {
  const { agg, lang, c } = useView();

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{c.navEmission}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">{c.ecrFormula}</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label={c.emission} value={`${formatBem(agg.emission, 1)} BEM`} />
        <Metric label={c.minerSells} value={`${formatBem(agg.minerSells, 1)} BEM`} />
        <Metric label={c.miners} value={formatInt(agg.minersAvg)} />
      </div>
      <SeriesChart agg={agg} lang={lang} />
      <section className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr className="border-b border-line">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">{c.emission}</th>
              <th className="px-4 py-3 font-medium">{c.minerSells}</th>
              <th className="px-4 py-3 font-medium">{c.circuits}</th>
              <th className="px-4 py-3 font-medium">{c.acquired}</th>
            </tr>
          </thead>
          <tbody>
            {agg.days
              .slice()
              .reverse()
              .map((d) => (
                <tr key={d.date} className="border-b border-line/70">
                  <td className="px-4 py-2.5 font-mono text-xs">{formatDay(d.date, lang)}</td>
                  <td className="px-4 py-2.5 font-mono tabular-nums">{formatBem(d.emission, 1)}</td>
                  <td className="px-4 py-2.5 font-mono tabular-nums">{formatBem(d.minerSells, 1)}</td>
                  <td className="px-4 py-2.5 font-mono tabular-nums">{d.circuits}</td>
                  <td className="px-4 py-2.5 font-mono tabular-nums">{formatBem(d.acquired, 2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 font-mono text-2xl tabular-nums">{value}</p>
    </div>
  );
}
