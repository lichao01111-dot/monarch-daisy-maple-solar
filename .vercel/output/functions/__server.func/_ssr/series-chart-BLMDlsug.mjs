import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as formatDay, l as t, u as formatBem } from "./router-C8dR2mc3.mjs";
import { a as Line, c as Tooltip, i as Area, n as YAxis, o as CartesianGrid, r as XAxis, s as ResponsiveContainer, t as ComposedChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/series-chart-BLMDlsug.js
var import_jsx_runtime = require_jsx_runtime();
function SeriesChart({ agg, lang }) {
	const c = t(lang);
	const data = agg.days.map((d) => ({
		date: d.date,
		label: formatDay(d.date, lang),
		emission: Number(d.emission.toFixed(2)),
		acquired: Number(d.acquired.toFixed(3)),
		sells: Number(d.minerSells.toFixed(2))
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-surface p-5 md:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "var(--color-fg)",
					label: c.chartEmission
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "var(--color-accent)",
					label: c.chartAcquired
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					swatch: "var(--color-muted)",
					dashed: true,
					label: c.chartSells
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56 w-full md:h-64",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
					data,
					margin: {
						top: 8,
						right: 8,
						left: -12,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "var(--color-line)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "label",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11,
								fontFamily: "IBM Plex Mono"
							},
							axisLine: { stroke: "var(--color-line)" },
							tickLine: false,
							interval: "preserveStartEnd"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11,
								fontFamily: "IBM Plex Mono"
							},
							axisLine: false,
							tickLine: false,
							tickFormatter: (v) => formatBem(v, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							cursor: { stroke: "var(--color-line)" },
							content: ({ active, payload, label }) => {
								if (!active || !payload?.length) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-sm border border-line bg-raised px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-1 text-muted",
										children: label
									}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono tabular-nums",
										children: [
											p.name,
											": ",
											formatBem(Number(p.value), 2)
										]
									}, String(p.dataKey)))]
								});
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "emission",
							name: c.chartEmission,
							stroke: "var(--color-fg)",
							fill: "var(--color-fg)",
							fillOpacity: .06,
							strokeWidth: 1.4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "acquired",
							name: c.chartAcquired,
							stroke: "var(--color-accent)",
							strokeWidth: 1.8,
							dot: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "sells",
							name: c.chartSells,
							stroke: "var(--color-muted)",
							strokeDasharray: "4 4",
							strokeWidth: 1.2,
							dot: false
						})
					]
				})
			})
		})]
	});
}
function Legend({ swatch, label, dashed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-px w-5",
			style: {
				background: dashed ? "transparent" : swatch,
				borderTop: dashed ? `1.5px dashed ${swatch}` : void 0
			}
		}), label]
	});
}
//#endregion
export { SeriesChart as t };
