import { formatBem, formatPct } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";
import type { Aggregate } from "@/lib/ledger";

export function AccountingCompare({ agg, lang }: { agg: Aggregate; lang: Lang }) {
  const c = t(lang);

  return (
    <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">{c.compare}</p>
      <p className="mt-2 max-w-xl text-sm text-muted">{c.compareLead}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-line bg-raised p-4">
          <p className="text-xs text-muted">{c.strict}</p>
          <p className="mt-2 font-mono text-3xl tabular-nums">{formatPct(agg.ecr)}</p>
          <p className="mt-3 text-sm text-muted">
            {c.counted}: {formatBem(agg.acquired, 2)} BEM
          </p>
        </div>
        <div className="rounded-md border border-line bg-bg p-4">
          <p className="text-xs text-muted">{c.naive}</p>
          <p className="mt-2 font-mono text-3xl tabular-nums text-faint">
            {formatPct(agg.naiveEcr)}
          </p>
          <p className="mt-3 text-sm text-muted">{c.naiveHint}</p>
        </div>
      </div>
    </section>
  );
}
