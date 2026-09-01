import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as formatInt, l as t, m as formatUsd, p as formatPct, u as formatBem } from "./router-C8dR2mc3.mjs";
import { t as useView } from "./use-view-B6rju_gf.mjs";
import { t as SeriesChart } from "./series-chart-BLMDlsug.mjs";
import { t as AccountingCompare } from "./compare-BG7ue5mb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dn_K3g4J.js
var import_jsx_runtime = require_jsx_runtime();
function CoverageTrack({ ecr, ghost, label, ghostLabel }) {
	const pct = Math.max(0, Math.min(1, ecr));
	const ghostPct = ghost !== void 0 ? Math.max(0, Math.min(1, ghost)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono tabular-nums text-fg",
					children: formatPct(ecr)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-3 overflow-hidden rounded-xs bg-raised",
				children: [
					ghost !== void 0 && ghostPct > pct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 left-0 bg-fg/20",
						style: { width: `${ghostPct * 100}%` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 left-0 bg-accent",
						style: { width: `${pct * 100}%` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticks, {})
				]
			}),
			ghost !== void 0 && ghostLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: [
					ghostLabel,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tabular-nums text-muted",
						children: formatPct(ghost)
					})
				]
			}) : null
		]
	});
}
function Ticks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "pointer-events-none absolute inset-0 size-full text-bg/40",
		preserveAspectRatio: "none",
		"aria-hidden": "true",
		children: Array.from({ length: 21 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: `${i / 20 * 100}%`,
			x2: `${i / 20 * 100}%`,
			y1: i % 5 === 0 ? "0" : "40%",
			y2: "100%",
			stroke: "currentColor",
			strokeWidth: "1"
		}, i))
	});
}
function EcrHero({ agg, lang, projectedEcr }) {
	const c = t(lang);
	const zero = agg.acquired <= 1e-4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-surface p-5 shadow-panel md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-muted uppercase",
				children: c.ecr
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-5xl leading-none font-medium tracking-tight tabular-nums md:text-6xl",
				children: formatPct(agg.ecr)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm text-muted",
				children: c.ecrFormula
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageTrack, {
					ecr: agg.ecr,
					ghost: projectedEcr,
					label: c.coverage,
					ghostLabel: projectedEcr !== void 0 ? c.projectedEcr : void 0
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: c.acquired,
						v: `${formatBem(agg.acquired, 2)} BEM`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: c.emission,
						v: `${formatBem(agg.emission, 1)} BEM`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: c.fee,
						v: formatUsd(agg.feeUsd)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: c.volume,
						v: formatUsd(agg.volumeUsd)
					})
				]
			}),
			zero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-md border border-line bg-raised px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: c.ecrZeroTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: c.ecrZeroBody
				})]
			}) : null
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-mono text-sm tabular-nums md:text-base",
		children: v
	})] });
}
function FactoryStrip({ agg, lang }) {
	const c = t(lang);
	const stages = [
		{
			k: "NAND",
			v: formatInt(agg.nand),
			s: c.nand
		},
		{
			k: "LATCH",
			v: formatInt(agg.latch),
			s: c.latch
		},
		{
			k: "CIRCUIT",
			v: formatInt(agg.circuits),
			s: c.circuits
		},
		{
			k: "MINER",
			v: formatInt(agg.minersAvg),
			s: c.miners
		},
		{
			k: "BEM",
			v: formatBem(agg.emission, 0),
			s: c.emission
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-surface p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted uppercase",
				children: c.factory
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
				children: stages.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative rounded-md border border-line bg-raised px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[10px] tracking-[0.14em] text-faint",
							children: [
								String(i + 1).padStart(2, "0"),
								" ",
								st.k
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-xl tabular-nums",
							children: st.v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: st.s
						})
					]
				}, st.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-faint",
				children: c.v2Pending
			})
		]
	});
}
function Home() {
	const { agg, lang, c } = useView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EcrHero, {
				agg,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactoryStrip, {
				agg,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesChart, {
				agg,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountingCompare, {
				agg,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-faint",
				children: [
					c.asOf,
					" ",
					agg.days.at(-1)?.date ?? "—",
					" · ",
					c.price,
					" $",
					agg.price.toFixed(2),
					" · ",
					c.minerSells,
					" ",
					formatBem(agg.minerSells, 0),
					" BEM"
				]
			})
		]
	});
}
//#endregion
export { Home as component };
