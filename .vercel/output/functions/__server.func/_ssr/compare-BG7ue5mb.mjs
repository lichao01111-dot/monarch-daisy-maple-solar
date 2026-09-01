import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as t, p as formatPct, u as formatBem } from "./router-C8dR2mc3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-BG7ue5mb.js
var import_jsx_runtime = require_jsx_runtime();
function AccountingCompare({ agg, lang }) {
	const c = t(lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-line bg-surface p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted uppercase",
				children: c.compare
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: c.compareLead
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-raised p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: c.strict
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-3xl tabular-nums",
							children: formatPct(agg.ecr)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [
								c.counted,
								": ",
								formatBem(agg.acquired, 2),
								" BEM"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-bg p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: c.naive
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-3xl tabular-nums text-faint",
							children: formatPct(agg.naiveEcr)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: c.naiveHint
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { AccountingCompare as t };
