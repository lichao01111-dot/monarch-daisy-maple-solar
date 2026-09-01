import { DEST_KEYS, destShare, destSum, type DestKey, type Destinations } from "@/lib/ledger";
import { formatBem, formatPct } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";

const LABELS: Record<DestKey, keyof ReturnType<typeof t>> = {
  retired: "retired",
  timeLocked: "timeLocked",
  settlementLiquidity: "settlementLiquidity",
  builderBounty: "builderBounty",
  securityReserve: "securityReserve",
  executionVault: "executionVault",
};

export function DestinationSplit({
  dest,
  lang,
}: {
  dest: Destinations;
  lang: Lang;
}) {
  const c = t(lang);
  const total = destSum(dest);

  return (
    <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">{c.destTitle}</p>
      <p className="mt-2 max-w-xl text-sm text-muted">{c.destNote}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {DEST_KEYS.map((key) => {
          const share = destShare(dest, key);
          return (
            <li key={key}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span>{c[LABELS[key]]}</span>
                <span className="font-mono tabular-nums text-muted">
                  {formatBem(dest[key], 2)} · {formatPct(share, 0)}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-xs bg-raised">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${Math.max(0, share * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 font-mono text-xs tabular-nums text-faint">
        Σ {formatBem(total, 2)} BEM
      </p>
    </section>
  );
}
