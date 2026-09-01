import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBem, formatDay } from "@/lib/format";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/store";
import type { Aggregate } from "@/lib/ledger";

export function SeriesChart({ agg, lang }: { agg: Aggregate; lang: Lang }) {
  const c = t(lang);
  const data = agg.days.map((d) => ({
    date: d.date,
    label: formatDay(d.date, lang),
    emission: Number(d.emission.toFixed(2)),
    acquired: Number(d.acquired.toFixed(3)),
    sells: Number(d.minerSells.toFixed(2)),
  }));

  return (
    <section className="rounded-xl border border-line bg-surface p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <Legend swatch="var(--color-fg)" label={c.chartEmission} />
        <Legend swatch="var(--color-accent)" label={c.chartAcquired} />
        <Legend swatch="var(--color-muted)" dashed label={c.chartSells} />
      </div>
      <div className="h-56 w-full md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "var(--color-muted)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              axisLine={{ stroke: "var(--color-line)" }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "var(--color-muted)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => formatBem(v, 0)}
            />
            <Tooltip
              cursor={{ stroke: "var(--color-line)" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-sm border border-line bg-raised px-3 py-2 text-xs">
                    <p className="mb-1 text-muted">{label}</p>
                    {payload.map((p) => (
                      <p key={String(p.dataKey)} className="font-mono tabular-nums">
                        {p.name}: {formatBem(Number(p.value), 2)}
                      </p>
                    ))}
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="emission"
              name={c.chartEmission}
              stroke="var(--color-fg)"
              fill="var(--color-fg)"
              fillOpacity={0.06}
              strokeWidth={1.4}
            />
            <Line
              type="monotone"
              dataKey="acquired"
              name={c.chartAcquired}
              stroke="var(--color-accent)"
              strokeWidth={1.8}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sells"
              name={c.chartSells}
              stroke="var(--color-muted)"
              strokeDasharray="4 4"
              strokeWidth={1.2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Legend({
  swatch,
  label,
  dashed,
}: {
  swatch: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-muted">
      <span
        className="h-px w-5"
        style={{
          background: dashed ? "transparent" : swatch,
          borderTop: dashed ? `1.5px dashed ${swatch}` : undefined,
        }}
      />
      {label}
    </span>
  );
}
