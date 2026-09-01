import { formatBem, formatPct, formatUsd } from "@/lib/format";
import { t } from "@/lib/copy";
import { DEFAULT_SCENARIO, projectScenario, type Aggregate } from "@/lib/ledger";
import { useBoard, type Lang } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function ScenarioPanel({ agg, lang }: { agg: Aggregate; lang: Lang }) {
  const c = t(lang);
  const scenario = useBoard((s) => s.scenario);
  const setScenario = useBoard((s) => s.setScenario);
  const resetScenario = useBoard((s) => s.resetScenario);
  const proj = projectScenario(agg, scenario);
  const dirty =
    scenario.volumeUsd !== DEFAULT_SCENARIO.volumeUsd ||
    scenario.feeBps !== DEFAULT_SCENARIO.feeBps ||
    scenario.buyShare !== DEFAULT_SCENARIO.buyShare;

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-line bg-surface p-5 md:p-6">
      <div>
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{c.scenario}</p>
        <p className="mt-2 text-sm text-muted">{c.scenarioLead}</p>
      </div>

      <SliderField
        label={c.dailyVolume}
        valueLabel={formatUsd(scenario.volumeUsd)}
        min={0}
        max={2_000_000}
        step={5_000}
        value={scenario.volumeUsd}
        onChange={(volumeUsd) => setScenario({ volumeUsd })}
      />
      <SliderField
        label={c.feeBps}
        valueLabel={`${scenario.feeBps.toFixed(0)} bps`}
        min={0}
        max={20}
        step={1}
        value={scenario.feeBps}
        onChange={(feeBps) => setScenario({ feeBps })}
      />
      <SliderField
        label={c.buyShare}
        valueLabel={formatPct(scenario.buyShare, 0)}
        min={0}
        max={1}
        step={0.05}
        value={scenario.buyShare}
        onChange={(buyShare) => setScenario({ buyShare })}
      />

      <div className="rounded-md border border-line bg-raised px-4 py-3">
        <p className="text-xs text-muted">{c.projectedEcr}</p>
        <p className="mt-1 font-mono text-3xl tabular-nums">{formatPct(proj.ecr)}</p>
        <p className="mt-2 font-mono text-xs tabular-nums text-muted">
          {c.projectedBuy} {formatBem(proj.acquired, 2)} BEM
        </p>
      </div>

      {dirty ? (
        <Button variant="outline" size="sm" onClick={resetScenario}>
          {c.reset}
        </Button>
      ) : null}
    </section>
  );
}

function SliderField({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-muted">{valueLabel}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 w-full cursor-pointer appearance-none bg-transparent"
      />
    </label>
  );
}
