import { formatBem, formatPct, formatUsd } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";
import type { Aggregate } from "@/lib/ledger";
import { CoverageTrack } from "@/components/board/coverage-track";

export function EcrHero({
  agg,
  lang,
  projectedEcr,
}: {
  agg: Aggregate;
  lang: Lang;
  projectedEcr?: number;
}) {
  const c = t(lang);
  const zero = agg.acquired <= 0.0001;

  return (
    <section className="rounded-xl border border-line bg-surface p-5 shadow-panel md:p-8">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">{c.ecr}</p>
      <p className="mt-3 font-mono text-5xl leading-none font-medium tracking-tight tabular-nums md:text-6xl">
        {formatPct(agg.ecr)}
      </p>
      <p className="mt-4 max-w-xl text-sm text-muted">{c.ecrFormula}</p>
      <div className="mt-6">
        <CoverageTrack
          ecr={agg.ecr}
          ghost={projectedEcr}
          label={c.coverage}
          ghostLabel={projectedEcr !== undefined ? c.projectedEcr : undefined}
        />
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat k={c.acquired} v={`${formatBem(agg.acquired, 2)} BEM`} />
        <Stat k={c.emission} v={`${formatBem(agg.emission, 1)} BEM`} />
        <Stat k={c.fee} v={formatUsd(agg.feeUsd)} />
        <Stat k={c.volume} v={formatUsd(agg.volumeUsd)} />
      </dl>
      {zero ? (
        <div className="mt-6 rounded-md border border-line bg-raised px-4 py-3">
          <p className="text-sm font-medium">{c.ecrZeroTitle}</p>
          <p className="mt-1 text-sm text-muted">{c.ecrZeroBody}</p>
        </div>
      ) : null}
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{k}</dt>
      <dd className="mt-1 font-mono text-sm tabular-nums md:text-base">{v}</dd>
    </div>
  );
}
