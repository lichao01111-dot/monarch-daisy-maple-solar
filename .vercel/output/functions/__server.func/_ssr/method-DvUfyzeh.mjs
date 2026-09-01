import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as formatPct, u as formatBem } from "./router-C8dR2mc3.mjs";
import { t as useView } from "./use-view-B6rju_gf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/method-DvUfyzeh.js
var import_jsx_runtime = require_jsx_runtime();
function MethodPage() {
	const { agg, c } = useView();
	const blocks = [
		{
			t: c.method1t,
			b: c.method1
		},
		{
			t: c.method2t,
			b: c.method2
		},
		{
			t: c.method3t,
			b: c.method3
		},
		{
			t: c.method4t,
			b: c.method4
		},
		{
			t: c.method5t,
			b: c.method5
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: c.methodTitle
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-sm text-muted",
				children: c.ecrFormula
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-3",
				children: blocks.map((bl, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.16em] text-faint",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-base font-medium",
							children: bl.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm leading-6 text-muted",
							children: bl.b
						})
					]
				}, bl.t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-line bg-surface p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: c.worked
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: c.emission,
								v: `${formatBem(agg.emission, 1)} BEM`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: c.acquired,
								v: `${formatBem(agg.acquired, 2)} BEM`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: c.ecr,
								v: formatPct(agg.ecr)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: c.naive,
								v: formatPct(agg.naiveEcr)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-md bg-raised px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [c.counted, ":"]
								}),
								" ",
								c.acquired
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-md bg-raised px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [c.notCounted, ":"]
								}),
								" ",
								c.retired,
								", ",
								c.timeLocked,
								", ",
								c.builderBounty
							]
						})]
					})
				]
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-3 border-b border-line py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-sm tabular-nums",
			children: v
		})]
	});
}
//#endregion
export { MethodPage as component };
