import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as formatDay, f as formatInt, u as formatBem } from "./router-C8dR2mc3.mjs";
import { t as useView } from "./use-view-B6rju_gf.mjs";
import { t as SeriesChart } from "./series-chart-BLMDlsug.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/emission-B4fYONA6.js
var import_jsx_runtime = require_jsx_runtime();
function EmissionPage() {
	const { agg, lang, c } = useView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: c.navEmission
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: c.ecrFormula
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: c.emission,
						value: `${formatBem(agg.emission, 1)} BEM`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: c.minerSells,
						value: `${formatBem(agg.minerSells, 1)} BEM`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: c.miners,
						value: formatInt(agg.minersAvg)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesChart, {
				agg,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "overflow-x-auto rounded-xl border border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[520px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: c.emission
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: c.minerSells
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: c.circuits
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: c.acquired
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: agg.days.slice().reverse().map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 font-mono text-xs",
								children: formatDay(d.date, lang)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 font-mono tabular-nums",
								children: formatBem(d.emission, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 font-mono tabular-nums",
								children: formatBem(d.minerSells, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 font-mono tabular-nums",
								children: d.circuits
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2.5 font-mono tabular-nums",
								children: formatBem(d.acquired, 2)
							})
						]
					}, d.date)) })]
				})
			})
		]
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-mono text-2xl tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { EmissionPage as component };
