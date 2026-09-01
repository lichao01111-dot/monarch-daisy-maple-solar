import { createFileRoute } from "@tanstack/react-router";
import { AccountingCompare } from "@/components/board/compare";
import { DestinationSplit } from "@/components/board/destinations";
import { WindowsList } from "@/components/board/windows-list";
import { formatBem, formatUsd } from "@/lib/format";
import { destSum } from "@/lib/ledger";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/flow")({ component: FlowPage });

function FlowPage() {
  const { agg, lang, c } = useView();
  const destTotal = destSum(agg.dest);
  const drift = Math.abs(destTotal - agg.acquired);

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{c.navFlow}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">{c.destNote}</p>
      </header>

      <ol className="grid gap-3 md:grid-cols-3">
        <FlowStep n="01" label={c.volume} value={formatUsd(agg.volumeUsd)} />
        <FlowStep n="02" label={c.fee} value={formatUsd(agg.feeUsd)} />
        <FlowStep n="03" label={c.acquired} value={`${formatBem(agg.acquired, 2)} BEM`} />
      </ol>

      <p className="font-mono text-xs tabular-nums text-faint">
        dest Σ {formatBem(destTotal, 2)} · acquired {formatBem(agg.acquired, 2)} · Δ {formatBem(drift, 3)}
      </p>

      <AccountingCompare agg={agg} lang={lang} />
      <DestinationSplit dest={agg.dest} lang={lang} />
      <WindowsList windows={agg.windows} lang={lang} />
    </div>
  );
}

function FlowStep({ n, label, value }: { n: string; label: string; value: string }) {
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <p className="font-mono text-[10px] tracking-[0.16em] text-faint">{n}</p>
      <p className="mt-2 text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl tabular-nums">{value}</p>
    </li>
  );
}
