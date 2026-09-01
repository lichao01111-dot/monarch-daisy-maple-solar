import { aggregate, projectScenario } from "@/lib/ledger";
import { t } from "@/lib/copy";
import { useBoard } from "@/lib/store";

export function useView() {
  const period = useBoard((s) => s.period);
  const mode = useBoard((s) => s.mode);
  const lang = useBoard((s) => s.lang);
  const scenario = useBoard((s) => s.scenario);
  const agg = aggregate(mode, period);
  const proj = projectScenario(agg, scenario);
  return { period, mode, lang, scenario, agg, proj, c: t(lang) };
}
