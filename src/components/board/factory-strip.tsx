import { formatBem, formatInt } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";
import type { Aggregate } from "@/lib/ledger";

export function FactoryStrip({ agg, lang }: { agg: Aggregate; lang: Lang }) {
  const c = t(lang);
  const stages = [
    { k: "NAND", v: formatInt(agg.nand), s: c.nand },
    { k: "LATCH", v: formatInt(agg.latch), s: c.latch },
    { k: "CIRCUIT", v: formatInt(agg.circuits), s: c.circuits },
    { k: "MINER", v: formatInt(agg.minersAvg), s: c.miners },
    { k: "BEM", v: formatBem(agg.emission, 0), s: c.emission },
  ];

  return (
    <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">{c.factory}</p>
      <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((st, i) => (
          <li
            key={st.k}
            className="relative rounded-md border border-line bg-raised px-3 py-3"
          >
            <p className="font-mono text-[10px] tracking-[0.14em] text-faint">
              {String(i + 1).padStart(2, "0")} {st.k}
            </p>
            <p className="mt-2 font-mono text-xl tabular-nums">{st.v}</p>
            <p className="mt-1 text-xs text-muted">{st.s}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-faint">{c.v2Pending}</p>
    </section>
  );
}
