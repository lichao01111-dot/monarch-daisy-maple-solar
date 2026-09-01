import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as formatBem } from "./router-C8dR2mc3.mjs";
import { t as useView } from "./use-view-B6rju_gf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/circulation-BY34LDU0.js
var import_jsx_runtime = require_jsx_runtime();
function CirculationPage() {
	const { agg, c } = useView();
	const rows = [
		{
			k: c.supplyStart,
			v: agg.supplyStart
		},
		{
			k: `+ ${c.emission}`,
			v: agg.emission
		},
		{
			k: `− ${c.retired}`,
			v: -agg.dest.retired
		},
		{
			k: c.supplyEnd,
			v: agg.supplyEnd,
			bold: true
		},
		{
			k: c.locked,
			v: agg.lockedEnd
		},
		{
			k: c.burned,
			v: agg.burnedEnd
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: c.navCirculation
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: c.v2Pending
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl border border-line bg-surface p-5 md:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: r.k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono tabular-nums ${r.bold ? "text-xl text-fg" : "text-base"}`,
							children: formatBem(r.v, 1)
						})]
					}, r.k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: c.processor,
						value: formatBem(agg.processorSink, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: c.bnn,
						value: formatBem(agg.bnnSink, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: c.minerSells,
						value: formatBem(agg.minerSells, 1)
					})
				]
			})
		]
	});
}
function Tile({ label, value }) {
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
export { CirculationPage as component };
