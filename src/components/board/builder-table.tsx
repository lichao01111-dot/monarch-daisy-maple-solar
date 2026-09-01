import { formatBem, formatInt, shortAddr } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";
import type { BuilderWork } from "@/lib/ledger";
import { Badge } from "@/components/ui/badge";

export function BuilderTable({
  rows,
  lang,
}: {
  rows: BuilderWork[];
  lang: Lang;
}) {
  const c = t(lang);
  const kindLabel = {
    circuit: c.circuit,
    component: c.component,
    pod: c.pod,
    docs: c.docs,
  };

  if (rows.length === 0) {
    return <p className="text-sm text-faint">{c.emptyBuilders}</p>;
  }

  const shown = rows.slice().reverse().slice(0, 24);

  return (
    <>
      <p className="mb-4 max-w-xl text-sm text-muted">{c.buildersLead}</p>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs tracking-wide text-muted">
            <tr className="border-b border-line">
              <th className="py-2 pr-3 font-medium">{c.kind}</th>
              <th className="py-2 pr-3 font-medium">{c.title}</th>
              <th className="py-2 pr-3 font-medium">{c.author}</th>
              <th className="py-2 pr-3 font-medium">{c.transistors}</th>
              <th className="py-2 pr-3 font-medium">{c.pod}</th>
              <th className="py-2 font-medium">{c.bounty}</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-b border-line/70">
                <td className="py-2.5 pr-3">
                  <Badge>{kindLabel[r.kind]}</Badge>
                </td>
                <td className="py-2.5 pr-3">{r.title}</td>
                <td className="py-2.5 pr-3 font-mono text-xs">{shortAddr(r.author)}</td>
                <td className="py-2.5 pr-3 font-mono tabular-nums">{formatInt(r.transistors)}</td>
                <td className="py-2.5 pr-3 font-mono tabular-nums">
                  {r.podScore === null ? "—" : r.podScore}
                </td>
                <td className="py-2.5 font-mono tabular-nums">{formatBem(r.bountyBem, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex flex-col gap-3 md:hidden">
        {shown.map((r) => (
          <li key={r.id} className="rounded-md border border-line bg-raised p-3">
            <div className="flex items-center justify-between gap-2">
              <Badge>{kindLabel[r.kind]}</Badge>
              <span className="font-mono text-xs tabular-nums text-muted">
                {formatBem(r.bountyBem, 2)} BEM
              </span>
            </div>
            <p className="mt-2 text-sm">{r.title}</p>
            <p className="mt-1 font-mono text-xs text-faint">
              {shortAddr(r.author)} · {formatInt(r.transistors)} tx
              {r.podScore !== null ? ` · PoD ${r.podScore}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
