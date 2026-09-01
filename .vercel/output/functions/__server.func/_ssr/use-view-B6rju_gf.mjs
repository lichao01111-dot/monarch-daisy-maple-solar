import { a as aggregate, c as projectScenario, l as t, r as useBoard } from "./router-C8dR2mc3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-view-B6rju_gf.js
function useView() {
	const period = useBoard((s) => s.period);
	const mode = useBoard((s) => s.mode);
	const lang = useBoard((s) => s.lang);
	const scenario = useBoard((s) => s.scenario);
	const agg = aggregate(mode, period);
	return {
		period,
		mode,
		lang,
		scenario,
		agg,
		proj: projectScenario(agg, scenario),
		c: t(lang)
	};
}
//#endregion
export { useView as t };
