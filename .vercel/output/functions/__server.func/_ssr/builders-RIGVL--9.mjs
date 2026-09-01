import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as formatInt, h as shortAddr, l as t, u as formatBem } from "./router-C8dR2mc3.mjs";
import { t as Badge } from "./badge-DzX4xYPk.mjs";
import { t as useView } from "./use-view-B6rju_gf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/builders-RIGVL--9.js
var import_jsx_runtime = require_jsx_runtime();
function BuilderTable({ rows, lang }) {
	const c = t(lang);
	const kindLabel = {
		circuit: c.circuit,
		component: c.component,
		pod: c.pod,
		docs: c.docs
	};
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-faint",
		children: c.emptyBuilders
	});
	const shown = rows.slice().reverse().slice(0, 24);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 max-w-xl text-sm text-muted",
			children: c.buildersLead
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-x-auto md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-xs tracking-wide text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: c.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: c.author
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: c.transistors
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: c.pod
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: c.bounty
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: kindLabel[r.kind] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-3",
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-3 font-mono text-xs",
							children: shortAddr(r.author)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-3 font-mono tabular-nums",
							children: formatInt(r.transistors)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 pr-3 font-mono tabular-nums",
							children: r.podScore === null ? "—" : r.podScore
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 font-mono tabular-nums",
							children: formatBem(r.bountyBem, 2)
						})
					]
				}, r.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-3 md:hidden",
			children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-md border border-line bg-raised p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: kindLabel[r.kind] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs tabular-nums text-muted",
							children: [formatBem(r.bountyBem, 2), " BEM"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: r.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-faint",
						children: [
							shortAddr(r.author),
							" · ",
							formatInt(r.transistors),
							" tx",
							r.podScore !== null ? ` · PoD ${r.podScore}` : ""
						]
					})
				]
			}, r.id))
		})
	] });
}
function BuildersPage() {
	const { agg, lang, c } = useView();
	const bounty = agg.dest.builderBounty;
	const taped = agg.circuits;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium tracking-tight",
				children: c.navBuilders
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: c.circuits,
						value: formatInt(taped)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: c.transistors,
						value: formatInt(agg.nand + agg.latch)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: c.bounty,
						value: `${formatBem(bounty, 2)} BEM`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl border border-line bg-surface p-5 md:p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuilderTable, {
					rows: agg.builders,
					lang
				})
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
export { BuildersPage as component };
