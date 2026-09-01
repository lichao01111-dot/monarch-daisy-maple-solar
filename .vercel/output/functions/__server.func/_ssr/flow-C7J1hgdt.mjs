import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as DEST_KEYS, l as t, m as formatUsd, o as destShare, p as formatPct, s as destSum, u as formatBem } from "./router-C8dR2mc3.mjs";
import { t as Badge } from "./badge-DzX4xYPk.mjs";
import { t as useView } from "./use-view-B6rju_gf.mjs";
import { t as AccountingCompare } from "./compare-BG7ue5mb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flow-C7J1hgdt.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	retired: "retired",
	timeLocked: "timeLocked",
	settlementLiquidity: "settlementLiquidity",
	builderBounty: "builderBounty",
	securityReserve: "securityReserve",
	executionVault: "executionVault"
};
function DestinationSplit({ dest, lang }) {
	const c = t(lang);
	const total = destSum(dest);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-surface p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted uppercase",
				children: c.destTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: c.destNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 flex flex-col gap-3",
				children: DEST_KEYS.map((key) => {
					const share = destShare(dest, key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c[LABELS[key]] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-muted",
							children: [
								formatBem(dest[key], 2),
								" · ",
								formatPct(share, 0)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-1.5 overflow-hidden rounded-xs bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent",
							style: { width: `${Math.max(0, share * 100)}%` }
						})
					})] }, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-xs tabular-nums text-faint",
				children: [
					"Σ ",
					formatBem(total, 2),
					" BEM"
				]
			})
		]
	});
}
function WindowsList({ windows, lang }) {
	const c = t(lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-surface p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted uppercase",
				children: c.windows
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: c.windowNote
			}),
			windows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm text-faint",
				children: c.emptyWindows
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 divide-y divide-line",
				children: windows.slice().reverse().slice(0, 10).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-faint",
						children: w.openedAt.replace("T", " ").replace("Z", " UTC")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							c.budget,
							" ",
							formatUsd(w.budgetUsd),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: " · "
							}),
							c.fill,
							" ",
							formatBem(w.filledBem, 2),
							" BEM"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs tabular-nums text-muted",
							children: [
								c.impact,
								" ",
								formatPct(w.impactPct, 2)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: w.status === "filled" ? "ok" : "danger",
							children: w.status === "filled" ? c.filled : c.skipped
						})]
					})]
				}, w.id))
			})
		]
	});
}
function FlowPage() {
	const { agg, lang, c } = useView();
	const destTotal = destSum(agg.dest);
	const drift = Math.abs(destTotal - agg.acquired);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: c.navFlow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: c.destNote
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
						n: "01",
						label: c.volume,
						value: formatUsd(agg.volumeUsd)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
						n: "02",
						label: c.fee,
						value: formatUsd(agg.feeUsd)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
						n: "03",
						label: c.acquired,
						value: `${formatBem(agg.acquired, 2)} BEM`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs tabular-nums text-faint",
				children: [
					"dest Σ ",
					formatBem(destTotal, 2),
					" · acquired ",
					formatBem(agg.acquired, 2),
					" · Δ ",
					formatBem(drift, 3)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountingCompare, {
				agg,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationSplit, {
				dest: agg.dest,
				lang
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowsList, {
				windows: agg.windows,
				lang
			})
		]
	});
}
function FlowStep({ n, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-xl border border-line bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-[0.16em] text-faint",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-2xl tabular-nums",
				children: value
			})
		]
	});
}
//#endregion
export { FlowPage as component };
