import { formatBem, formatUsd, formatPct } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";
import type { ExecutionWindow } from "@/lib/ledger";
import { Badge } from "@/components/ui/badge";

export function WindowsList({
  windows,
  lang,
}: {
  windows: ExecutionWindow[];
  lang: Lang;
}) {
  const c = t(lang);

  return (
    <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">{c.windows}</p>
      <p className="mt-2 max-w-xl text-sm text-muted">{c.windowNote}</p>
      {windows.length === 0 ? (
        <p className="mt-5 text-sm text-faint">{c.emptyWindows}</p>
      ) : (
        <ul className="mt-5 divide-y divide-line">
          {windows
            .slice()
            .reverse()
            .slice(0, 10)
            .map((w) => (
              <li key={w.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-faint">{w.openedAt.replace("T", " ").replace("Z", " UTC")}</p>
                  <p className="mt-1 text-sm">
                    {c.budget} {formatUsd(w.budgetUsd)}
                    <span className="text-faint"> · </span>
                    {c.fill} {formatBem(w.filledBem, 2)} BEM
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {c.impact} {formatPct(w.impactPct, 2)}
                  </span>
                  <Badge variant={w.status === "filled" ? "ok" : "danger"}>
                    {w.status === "filled" ? c.filled : c.skipped}
                  </Badge>
                </div>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
