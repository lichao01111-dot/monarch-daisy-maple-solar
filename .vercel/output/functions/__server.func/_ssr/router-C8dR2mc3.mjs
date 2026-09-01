import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as LayoutGrid, c as CircleDot, i as ScrollText, l as Calculator, n as Workflow, o as Layers, r as TriangleAlert, s as Cpu, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog, u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C8dR2mc3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function DieMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "5",
				y: "5",
				width: "22",
				height: "22",
				rx: "2",
				stroke: "currentColor",
				strokeWidth: "1.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 11.5h22M5 20.5h22M11.5 5v22M20.5 5v22",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "13.5",
				y: "13.5",
				width: "5",
				height: "5",
				fill: "currentColor"
			})
		]
	});
}
function formatBem(n, digits = 1) {
	const abs = Math.abs(n);
	if (abs >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
	if (abs >= 1e4) return `${(n / 1e3).toFixed(1)}k`;
	if (abs >= 100) return n.toFixed(0);
	if (abs >= 10) return n.toFixed(Math.min(digits, 1));
	if (abs === 0) return "0";
	return n.toFixed(digits);
}
function formatUsd(n) {
	const abs = Math.abs(n);
	const sign = n < 0 ? "-" : "";
	if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
	if (abs >= 1e4) return `${sign}$${(abs / 1e3).toFixed(1)}k`;
	if (abs >= 100) return `${sign}$${abs.toFixed(0)}`;
	if (abs === 0) return "$0";
	return `${sign}$${abs.toFixed(2)}`;
}
function formatPct(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return `${(n * 100).toFixed(digits)}%`;
}
function formatInt(n) {
	return Math.round(n).toLocaleString("en-US");
}
function formatDay(iso, lang) {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
	if (lang === "zh") return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function shortAddr(addr) {
	if (addr.startsWith("0x") && addr.length > 12) return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
	return addr;
}
var copy = {
	en: {
		app: "BEM Workboard",
		tagline: "External flow → BEM settlement → machine work",
		community: "Community ledger. Not an official TapeOut plan.",
		observed: "Observed",
		pilot: "Illustrative pilot",
		observedHint: "Silicon Markets is not live. External fee converted into BEM is zero.",
		pilotHint: "Sample AMDB-style pool from 20 Aug. Fees, fills and destinations are internally consistent — not on-chain yet.",
		period1: "24h",
		period7: "7d",
		period30: "30d",
		navOverview: "Overview",
		navEmission: "Emission",
		navFlow: "Flow",
		navCirculation: "Supply",
		navBuilders: "Builders",
		navMethod: "Method",
		ecr: "Emission Coverage Ratio",
		ecrFormula: "ECR = BEM acquired with external, non-BEM fees ÷ new BEM emission",
		ecrZeroTitle: "No external settlement this window",
		ecrZeroBody: "Miners are still producing. Nothing outside TapeOut has bought BEM with a disclosed fee. That is the honest number.",
		acquired: "External BEM acquired",
		emission: "New BEM emission",
		fee: "External fees",
		volume: "Eligible volume",
		naive: "Naive stacked ‘demand’",
		naiveHint: "Acquisition + burn + lock + bounty. Same BEM counted more than once. Not demand.",
		strict: "Strict (ECR)",
		coverage: "Coverage of new emission",
		factory: "On-chain factory",
		nand: "NAND consumed",
		latch: "LATCH consumed",
		circuits: "Circuits taped",
		miners: "Avg. active miners",
		minerSells: "Est. miner sells",
		processor: "Processor sinks",
		bnn: "BNN training sinks",
		v2Pending: "V2 not live — productive BEM sinks are still zero.",
		destTitle: "Where acquired BEM went",
		destNote: "Destinations split one purchase. They are not additional demand. Totals equal BEM acquired.",
		retired: "Retired (burn)",
		timeLocked: "Time-locked",
		settlementLiquidity: "Settlement liquidity",
		builderBounty: "Builder bounty",
		securityReserve: "Security reserve",
		executionVault: "Execution vault",
		windows: "Buy execution",
		windowNote: "Batched windows, not per-swap market buys. Skip if impact or minimum fill is not met.",
		filled: "Filled",
		skipped: "Skipped",
		impact: "Impact",
		budget: "Budget",
		fill: "Fill",
		scenario: "What-if",
		scenarioLead: "If a community pool printed this volume every day in the selected window, with a public fee and a buy split.",
		dailyVolume: "Daily volume",
		feeBps: "Community fee",
		buyShare: "Share used to buy BEM",
		projectedEcr: "Projected ECR",
		projectedBuy: "Projected BEM bought",
		reset: "Reset",
		chartEmission: "Emission",
		chartAcquired: "External acquisition",
		chartSells: "Miner sells (est.)",
		supply: "Circulating after burns",
		locked: "Time-locked",
		burned: "Retired cumulative",
		supplyStart: "Start of window",
		supplyEnd: "End of window",
		buildersLead: "Verifiable work in the window. Bounty is a destination of acquired BEM, not a second buy.",
		kind: "Kind",
		title: "Title",
		author: "Author",
		transistors: "Transistors",
		pod: "PoD",
		bounty: "Bounty BEM",
		circuit: "Circuit",
		component: "Component",
		docs: "Docs",
		methodTitle: "How to read this board",
		method1t: "Count demand once",
		method1: "External fee that buys BEM is demand. Burning, locking, LP, or paying a builder is a destination of that same BEM. Summing them is an accounting trick.",
		method2t: "ECR is coverage, not a burn counter",
		method2: "It asks: how much of new emission was covered by actual BEM purchased with external, non-BEM economic activity?",
		method3t: "Internal loop is a different ledger",
		method3: "Processor spend and BNN training will be productive sinks. They matter. They are not the ECR numerator unless they are funded by external non-BEM fees.",
		method4t: "Silicon Markets is not a ticker",
		method4: "The test is whether semiconductor-adjacent flow can settle into BEM under public rules — not whether AMD or NVIDIA is a reserve asset.",
		method5t: "This sample is falsifiable",
		method5: "Observed mode is zero by construction until a hook exists. Pilot mode is a consistent illustration. If nobody trades, the experiment failed cleanly.",
		worked: "Worked example (this window)",
		notCounted: "Not counted as demand",
		counted: "Counted once",
		emptyWindows: "No execution window — nothing to buy.",
		emptyBuilders: "No taped work in this window.",
		price: "BEM mark",
		asOf: "Ledger through",
		compare: "Accounting compare",
		compareLead: "Same window, two ways of adding. Only the left column is ECR.",
		openScenario: "What-if calculator",
		close: "Close"
	},
	zh: {
		app: "BEM Workboard",
		tagline: "外部流入 → BEM 结算 → 机器工作",
		community: "社区账本。不是 TapeOut 官方计划。",
		observed: "观察值",
		pilot: "示意试点",
		observedHint: "Silicon Markets 尚未上线。外部费用换成的 BEM 为零。",
		pilotHint: "从 8 月 20 日起的 AMDB 风格样本池。费用、成交与去向内部自洽，链上尚未发生。",
		period1: "24小时",
		period7: "7天",
		period30: "30天",
		navOverview: "总览",
		navEmission: "排放",
		navFlow: "流向",
		navCirculation: "流通",
		navBuilders: "Builder",
		navMethod: "方法",
		ecr: "排放覆盖率",
		ecrFormula: "ECR = 外部非 BEM 费用换成的 BEM ÷ 同期新增 BEM 排放",
		ecrZeroTitle: "本窗口没有外部结算",
		ecrZeroBody: "矿工仍在生产。TapeOut 之外，还没有一笔可披露的费用买过 BEM。这就是诚实的数字。",
		acquired: "外部买入 BEM",
		emission: "新增 BEM 排放",
		fee: "外部费用",
		volume: "合格成交额",
		naive: "把去向再加一遍的「需求」",
		naiveHint: "买入 + 销毁 + 锁仓 + bounty。同一枚 BEM 算了多次。不是需求。",
		strict: "严格口径（ECR）",
		coverage: "对新排放的覆盖",
		factory: "链上工厂",
		nand: "NAND 消耗",
		latch: "LATCH 消耗",
		circuits: "已流片电路",
		miners: "日均在产矿机",
		minerSells: "矿工估售",
		processor: "Processor 消耗",
		bnn: "BNN 训练消耗",
		v2Pending: "V2 未上线 — 生产性 BEM 消耗仍为零。",
		destTitle: "买入的 BEM 去了哪里",
		destNote: "去向是一次购买的拆分，不是新的需求。合计等于外部买入的 BEM。",
		retired: "退出流通（销毁）",
		timeLocked: "锁仓",
		settlementLiquidity: "结算流动性",
		builderBounty: "Builder bounty",
		securityReserve: "安全储备",
		executionVault: "执行金库",
		windows: "回购执行",
		windowNote: "按窗口批量执行，而不是每笔 swap 市价买。冲击或最小成交不满足则跳过。",
		filled: "成交",
		skipped: "跳过",
		impact: "冲击",
		budget: "预算",
		fill: "成交量",
		scenario: "假如",
		scenarioLead: "若社区池在所选窗口每天都有这笔成交额，并按公开费率与买入拆分结算。",
		dailyVolume: "日成交额",
		feeBps: "社区费率",
		buyShare: "用于买入 BEM 的份额",
		projectedEcr: "推演 ECR",
		projectedBuy: "推演买入 BEM",
		reset: "重置",
		chartEmission: "排放",
		chartAcquired: "外部买入",
		chartSells: "矿工估售",
		supply: "销毁后流通",
		locked: "锁仓",
		burned: "累计退出",
		supplyStart: "窗口初",
		supplyEnd: "窗口末",
		buildersLead: "本窗口可核验的工作。Bounty 是买入 BEM 的去向，不是第二次买入。",
		kind: "类型",
		title: "名称",
		author: "作者",
		transistors: "晶体管",
		pod: "PoD",
		bounty: "Bounty BEM",
		circuit: "电路",
		component: "元件",
		docs: "文档",
		methodTitle: "怎么读这本账",
		method1t: "需求只计一次",
		method1: "外部费用买到 BEM 才是需求。销毁、锁仓、做市或付给 Builder，是同一枚 BEM 的去向。把它们加总是会计把戏。",
		method2t: "ECR 是覆盖率，不是销毁计数器",
		method2: "它只问：同期新增排放里，有多少被外部、非 BEM 的经济活动真正买走？",
		method3t: "内部循环是另一本账",
		method3: "Processor 支出和 BNN 训练将是生产性消耗。它们重要。除非由外部非 BEM 费用出资，否则不进入 ECR 分子。",
		method4t: "Silicon Markets 不是一只股票代码",
		method4: "要检验的是半导体相关流动能否按公开规则结算进 BEM，而不是 AMD 或 NVIDIA 会不会给 BEM 背书。",
		method5t: "这份样本必须能被证伪",
		method5: "观察值在 hook 出现前按构造为零。示意试点是自洽的推演。如果没人交易，实验就干净地失败。",
		worked: "本窗口的演算",
		notCounted: "不计为需求",
		counted: "只计一次",
		emptyWindows: "没有执行窗口 — 无买入。",
		emptyBuilders: "本窗口没有流片工作。",
		price: "BEM 标记价",
		asOf: "账期截至",
		compare: "口径对照",
		compareLead: "同一窗口，两种加法。只有左栏是 ECR。",
		openScenario: "假如计算器",
		close: "关闭"
	}
};
function t(lang) {
	return copy[lang];
}
var DEST_KEYS = [
	"retired",
	"timeLocked",
	"settlementLiquidity",
	"builderBounty",
	"securityReserve",
	"executionVault"
];
var BEM_PRICE = 15.08;
var GENESIS_SUPPLY = 25840;
var TODAY = "2026-09-01";
var PILOT_START = "2026-08-20";
function mulberry32(seed) {
	return () => {
		let t = seed += 1831565813;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function addDays(iso, days) {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + days);
	return d.toISOString().slice(0, 10);
}
function emptyDest() {
	return {
		retired: 0,
		timeLocked: 0,
		settlementLiquidity: 0,
		builderBounty: 0,
		securityReserve: 0,
		executionVault: 0
	};
}
function scaleDest(weight, acquired) {
	const total = weight.retired + weight.timeLocked + weight.settlementLiquidity + weight.builderBounty + weight.securityReserve + weight.executionVault;
	if (total <= 0 || acquired <= 0) return emptyDest();
	const raw = {
		retired: weight.retired / total * acquired,
		timeLocked: weight.timeLocked / total * acquired,
		settlementLiquidity: weight.settlementLiquidity / total * acquired,
		builderBounty: weight.builderBounty / total * acquired,
		securityReserve: weight.securityReserve / total * acquired,
		executionVault: weight.executionVault / total * acquired
	};
	const drift = acquired - destSum(raw);
	raw.retired += drift;
	return raw;
}
function destSum(d) {
	return d.retired + d.timeLocked + d.settlementLiquidity + d.builderBounty + d.securityReserve + d.executionVault;
}
function addDest(a, b) {
	return {
		retired: a.retired + b.retired,
		timeLocked: a.timeLocked + b.timeLocked,
		settlementLiquidity: a.settlementLiquidity + b.settlementLiquidity,
		builderBounty: a.builderBounty + b.builderBounty,
		securityReserve: a.securityReserve + b.securityReserve,
		executionVault: a.executionVault + b.executionVault
	};
}
var PILOT_WEIGHT = {
	retired: .3,
	timeLocked: .1,
	settlementLiquidity: .2,
	builderBounty: .3,
	securityReserve: .05,
	executionVault: .05
};
var CIRCUIT_TITLES = [
	"4-bit ripple adder",
	"Clock divider /16",
	"Behemoth ALU slice",
	"SR-latch ring",
	"8-bit counter",
	"2:1 mux tree",
	"Debounce FSM",
	"NAND array 32",
	"Parity checker",
	"Shift register 8",
	"Carry-lookahead nibble",
	"Reset synchronizer"
];
var AUTHORS = [
	"0x8c1a2b9d44e0aa71",
	"0x3f70c11e90ab66d2",
	"nandpunk",
	"0xa91e04cc77b12f08",
	"latchwork",
	"0x12d0bb4e83c9f1aa",
	"siliconsmith",
	"0x77e2c0d5ab194403",
	"pod-lab",
	"0xbe0f19a6c4d338e1"
];
function buildDays(mode) {
	const rng = mulberry32(mode === "pilot" ? 20260901 : 19940712);
	const start = addDays(TODAY, -29);
	const days = [];
	for (let i = 0; i < 30; i++) {
		const date = addDays(start, i);
		const dow = (/* @__PURE__ */ new Date(`${date}T00:00:00Z`)).getUTCDay();
		const weekend = dow === 0 || dow === 6;
		const wave = .5 + .5 * Math.sin(i / 4.2);
		const emission = (weekend ? 78 : 118) + wave * 28 + rng() * 14;
		const circuits = Math.max(2, Math.round((weekend ? 4 : 8) + rng() * 7));
		const nand = Math.round(circuits * (32 + rng() * 48));
		const latch = Math.round(circuits * (9 + rng() * 14));
		const miners = Math.round(48 + wave * 22 + rng() * 12);
		const minerSells = emission * (.38 + rng() * .16);
		let volumeUsd = 0;
		let feeUsd = 0;
		let acquired = 0;
		let dest = emptyDest();
		if (mode === "pilot" && date >= PILOT_START) {
			const age = Math.max(0, ((/* @__PURE__ */ new Date(`${date}T00:00:00Z`)).getTime() - (/* @__PURE__ */ new Date(`${PILOT_START}T00:00:00Z`)).getTime()) / 864e5);
			const ramp = Math.min(1, .35 + age / 18);
			volumeUsd = (weekend ? 7200 : 18400) * ramp * (.75 + rng() * .55);
			feeUsd = volumeUsd * (8 / 1e4);
			acquired = feeUsd * .5 / BEM_PRICE;
			dest = scaleDest(PILOT_WEIGHT, acquired);
		}
		days.push({
			date,
			emission: round4(emission),
			volumeUsd: round2(volumeUsd),
			feeUsd: round4(feeUsd),
			acquired: round4(acquired),
			dest: roundDest(dest),
			nand,
			latch,
			circuits,
			miners,
			minerSells: round4(minerSells),
			processorSink: 0,
			bnnSink: 0
		});
	}
	for (const d of days) {
		const s = destSum(d.dest);
		if (Math.abs(s - d.acquired) > .02) d.dest.retired += d.acquired - s;
	}
	return days;
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
function round4(n) {
	return Math.round(n * 1e4) / 1e4;
}
function roundDest(d) {
	return {
		retired: round4(d.retired),
		timeLocked: round4(d.timeLocked),
		settlementLiquidity: round4(d.settlementLiquidity),
		builderBounty: round4(d.builderBounty),
		securityReserve: round4(d.securityReserve),
		executionVault: round4(d.executionVault)
	};
}
function buildWindows(days) {
	const windows = [];
	for (const d of days) {
		if (d.acquired <= 0) continue;
		const budgetUsd = d.feeUsd * .5;
		const impact = .0036 + (d.volumeUsd > 28e3 ? .0014 : .0022);
		windows.push({
			id: `wnd-${d.date}`,
			openedAt: `${d.date}T00:00:00Z`,
			budgetUsd: round2(budgetUsd),
			filledBem: d.acquired,
			price: BEM_PRICE,
			impactPct: round4(impact),
			status: "filled",
			reason: void 0,
			dest: d.dest
		});
	}
	return windows;
}
function buildBuilders(days, mode) {
	const rng = mulberry32(mode === "pilot" ? 77 : 41);
	const works = [];
	let n = 0;
	for (const d of days) {
		const count = d.circuits;
		const bountyPool = d.dest.builderBounty;
		const per = count > 0 ? bountyPool / count : 0;
		for (let i = 0; i < count; i++) {
			n += 1;
			const kindRoll = rng();
			const kind = kindRoll > .86 ? "component" : kindRoll > .72 ? "pod" : kindRoll > .64 ? "docs" : "circuit";
			works.push({
				id: `w-${n.toString().padStart(3, "0")}`,
				date: d.date,
				kind,
				title: CIRCUIT_TITLES[Math.floor(rng() * CIRCUIT_TITLES.length)],
				author: AUTHORS[Math.floor(rng() * AUTHORS.length)],
				transistors: Math.round(18 + rng() * 220),
				podScore: kind === "docs" ? null : Math.round(62 + rng() * 36),
				bountyBem: round4(per)
			});
		}
	}
	return works;
}
var CACHE = {
	observed: (() => {
		const days = buildDays("observed");
		return {
			days,
			windows: buildWindows(days),
			builders: buildBuilders(days, "observed")
		};
	})(),
	pilot: (() => {
		const days = buildDays("pilot");
		return {
			days,
			windows: buildWindows(days),
			builders: buildBuilders(days, "pilot")
		};
	})()
};
function periodDays(period) {
	if (period === "1d") return 1;
	if (period === "7d") return 7;
	return 30;
}
function slicePeriod(rows, period) {
	const n = periodDays(period);
	return rows.slice(-n);
}
function aggregate(mode, period) {
	const src = CACHE[mode];
	const days = slicePeriod(src.days, period);
	const builders = slicePeriod(src.builders, period);
	const windows = src.windows.filter((w) => days.some((d) => w.openedAt.startsWith(d.date)));
	const allBefore = src.days.slice(0, src.days.length - days.length);
	let burned = 0;
	let locked = 0;
	let supply = GENESIS_SUPPLY;
	for (const d of allBefore) {
		supply += d.emission - d.dest.retired;
		burned += d.dest.retired;
		locked += d.dest.timeLocked;
	}
	const supplyStart = supply;
	const dest = emptyDest();
	let emission = 0;
	let acquired = 0;
	let feeUsd = 0;
	let volumeUsd = 0;
	let nand = 0;
	let latch = 0;
	let circuits = 0;
	let miners = 0;
	let minerSells = 0;
	let processorSink = 0;
	let bnnSink = 0;
	for (const d of days) {
		emission += d.emission;
		acquired += d.acquired;
		feeUsd += d.feeUsd;
		volumeUsd += d.volumeUsd;
		nand += d.nand;
		latch += d.latch;
		circuits += d.circuits;
		miners += d.miners;
		minerSells += d.minerSells;
		processorSink += d.processorSink;
		bnnSink += d.bnnSink;
		Object.assign(dest, addDest(dest, d.dest));
		supply += d.emission - d.dest.retired;
		burned += d.dest.retired;
		locked += d.dest.timeLocked;
	}
	const ecr = emission > 0 ? acquired / emission : 0;
	const naiveDemand = acquired + dest.retired + dest.timeLocked + dest.builderBounty;
	const naiveEcr = emission > 0 ? naiveDemand / emission : 0;
	return {
		days,
		emission,
		acquired,
		ecr,
		naiveDemand,
		naiveEcr,
		dest,
		feeUsd,
		volumeUsd,
		nand,
		latch,
		circuits,
		minersAvg: days.length ? miners / days.length : 0,
		minerSells,
		processorSink,
		bnnSink,
		productiveSinks: processorSink + bnnSink,
		supplyStart,
		supplyEnd: supply,
		lockedEnd: locked,
		burnedEnd: burned,
		windows,
		builders,
		price: BEM_PRICE
	};
}
var DEFAULT_SCENARIO = {
	volumeUsd: 25e3,
	feeBps: 8,
	buyShare: .5,
	retire: 30,
	lock: 10,
	pol: 20,
	bounty: 30,
	reserve: 10
};
function projectScenario(base, scenario) {
	const n = base.days.length || 1;
	const feeUsd = scenario.volumeUsd * (scenario.feeBps / 1e4) * n;
	const acquired = feeUsd * scenario.buyShare / BEM_PRICE;
	const dest = scaleDest({
		retired: scenario.retire,
		timeLocked: scenario.lock,
		settlementLiquidity: scenario.pol,
		builderBounty: scenario.bounty,
		securityReserve: scenario.reserve,
		executionVault: 0
	}, acquired);
	return {
		acquired,
		ecr: base.emission > 0 ? acquired / base.emission : 0,
		feeUsd,
		dest
	};
}
function destShare(dest, key) {
	const s = destSum(dest);
	if (s <= 0) return 0;
	return dest[key] / s;
}
var useBoard = create()(persist((set) => ({
	period: "7d",
	mode: "observed",
	lang: "zh",
	scenario: { ...DEFAULT_SCENARIO },
	setPeriod: (period) => set({ period }),
	setMode: (mode) => set({ mode }),
	setLang: (lang) => set({ lang }),
	setScenario: (patch) => set((s) => ({ scenario: {
		...s.scenario,
		...patch
	} })),
	resetScenario: () => set({ scenario: { ...DEFAULT_SCENARIO } })
}), {
	name: "bem-workboard-v2",
	partialize: (s) => ({ lang: s.lang })
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:opacity-90",
			outline: "border border-line bg-transparent text-fg hover:bg-raised",
			ghost: "text-muted hover:bg-raised hover:text-fg",
			accent: "bg-accent text-accent-fg hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function ScenarioPanel({ agg, lang }) {
	const c = t(lang);
	const scenario = useBoard((s) => s.scenario);
	const setScenario = useBoard((s) => s.setScenario);
	const resetScenario = useBoard((s) => s.resetScenario);
	const proj = projectScenario(agg, scenario);
	const dirty = scenario.volumeUsd !== DEFAULT_SCENARIO.volumeUsd || scenario.feeBps !== DEFAULT_SCENARIO.feeBps || scenario.buyShare !== DEFAULT_SCENARIO.buyShare;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-5 rounded-xl border border-line bg-surface p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.16em] text-muted uppercase",
				children: c.scenario
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: c.scenarioLead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: c.dailyVolume,
				valueLabel: formatUsd(scenario.volumeUsd),
				min: 0,
				max: 2e6,
				step: 5e3,
				value: scenario.volumeUsd,
				onChange: (volumeUsd) => setScenario({ volumeUsd })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: c.feeBps,
				valueLabel: `${scenario.feeBps.toFixed(0)} bps`,
				min: 0,
				max: 20,
				step: 1,
				value: scenario.feeBps,
				onChange: (feeBps) => setScenario({ feeBps })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
				label: c.buyShare,
				valueLabel: formatPct(scenario.buyShare, 0),
				min: 0,
				max: 1,
				step: .05,
				value: scenario.buyShare,
				onChange: (buyShare) => setScenario({ buyShare })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-line bg-raised px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: c.projectedEcr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-3xl tabular-nums",
						children: formatPct(proj.ecr)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs tabular-nums text-muted",
						children: [
							c.projectedBuy,
							" ",
							formatBem(proj.acquired, 2),
							" BEM"
						]
					})
				]
			}),
			dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: resetScenario,
				children: c.reset
			}) : null
		]
	});
}
function SliderField({ label, valueLabel, min, max, step, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-baseline justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono tabular-nums text-muted",
				children: valueLabel
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "h-10 w-full cursor-pointer appearance-none bg-transparent"
		})]
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-surface text-fg shadow-panel outline-none", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l border-line data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "bottom" && "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-xl border-t border-line data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-sm p-2 text-muted hover:bg-raised hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-6 pr-12", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-sans text-base font-medium", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
var NAV = [
	{
		to: "/",
		key: "navOverview",
		icon: LayoutGrid
	},
	{
		to: "/emission",
		key: "navEmission",
		icon: CircleDot
	},
	{
		to: "/flow",
		key: "navFlow",
		icon: Workflow
	},
	{
		to: "/circulation",
		key: "navCirculation",
		icon: Layers
	},
	{
		to: "/builders",
		key: "navBuilders",
		icon: Cpu
	},
	{
		to: "/method",
		key: "navMethod",
		icon: ScrollText
	}
];
function BoardShell({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const period = useBoard((s) => s.period);
	const mode = useBoard((s) => s.mode);
	const lang = useBoard((s) => s.lang);
	const setPeriod = useBoard((s) => s.setPeriod);
	const setMode = useBoard((s) => s.setMode);
	const setLang = useBoard((s) => s.setLang);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const resolvedLang = mounted ? lang : "zh";
	const resolvedMode = mounted ? mode : "observed";
	const resolvedPeriod = mounted ? period : "7d";
	const c = t(resolvedLang);
	const agg = aggregate(resolvedMode, resolvedPeriod);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-fab min-h-dvh text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg",
				children: "Skip to ledger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1400px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-bg/80 px-4 py-6 backdrop-blur-sm lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 px-1 text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DieMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex flex-col leading-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] tracking-[0.22em] text-muted",
									children: "TAPEOUT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 font-medium tracking-tight",
									children: c.app
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-8 flex flex-col gap-1",
							children: NAV.map((item) => {
								const Icon = item.icon;
								const active = pathname === item.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), c[item.key]]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-auto px-1 text-[11px] leading-5 text-faint",
							children: c.community
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 px-4 py-3 md:px-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 lg:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DieMark, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: c.app
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
											lang: resolvedLang,
											onChange: setLang
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												size: "icon",
												className: "min-[1100px]:hidden",
												"aria-label": c.openScenario,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "size-4" })
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
											side: "bottom",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: c.scenario }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: c.scenarioLead })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "overflow-y-auto px-6 pb-8",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioPanel, {
													agg,
													lang: resolvedLang
												})
											})]
										})] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
											value: resolvedMode,
											onChange: setMode,
											options: [{
												id: "observed",
												label: c.observed
											}, {
												id: "pilot",
												label: c.pilot
											}]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seg, {
											value: resolvedPeriod,
											onChange: setPeriod,
											options: [
												{
													id: "1d",
													label: c.period1
												},
												{
													id: "7d",
													label: c.period7
												},
												{
													id: "30d",
													label: c.period30
												}
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ml-auto hidden items-center gap-1 lg:flex",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
												lang: resolvedLang,
												onChange: setLang
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "outline",
													size: "sm",
													className: "gap-1 min-[1100px]:hidden",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "size-4" }), c.openScenario]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
												side: "bottom",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: c.scenario }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: c.scenarioLead })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "overflow-y-auto px-6 pb-8",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioPanel, {
														agg,
														lang: resolvedLang
													})
												})]
											})] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-faint",
									children: resolvedMode === "pilot" ? c.pilotHint : c.observedHint
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 gap-6 px-4 py-5 pb-24 md:px-6 md:py-8 lg:pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							id: "main",
							className: "min-w-0 flex-1",
							children
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "hidden w-80 shrink-0 min-[1100px]:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sticky top-28",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioPanel, {
									agg,
									lang: resolvedLang
								})
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-sm lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-6",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-14 flex-col items-center justify-center gap-0.5 px-0.5 text-[10px] leading-tight", active ? "text-fg" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-full truncate",
								children: c[item.key]
							})]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function Seg({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex rounded-md border border-line bg-surface p-0.5",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(o.id),
			className: cn("h-9 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150 sm:px-3", value === o.id ? "bg-fg text-bg" : "text-muted hover:text-fg"),
			children: o.label
		}, o.id))
	});
}
function LangToggle({ lang, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex rounded-md border border-line bg-surface p-0.5",
		children: ["zh", "en"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(l),
			className: cn("h-9 min-w-11 rounded-sm px-2 font-mono text-[11px] tracking-wide", lang === l ? "bg-raised text-fg" : "text-muted"),
			children: l === "zh" ? "中" : "EN"
		}, l))
	});
}
var styles_default = "/assets/styles-u_4pM1PO.css";
var APP_NAME = "BEM Workboard";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Public TapeOut ledger: emission, external BEM acquisition, destinations, builder output, and ECR — counted once."
			},
			{
				name: "theme-color",
				content: "#0b0c0b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-Dn_K3g4J.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./builders-RIGVL--9.mjs");
var Route$4 = createFileRoute("/builders")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./circulation-BY34LDU0.mjs");
var Route$3 = createFileRoute("/circulation")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./emission-B4fYONA6.mjs");
var Route$2 = createFileRoute("/emission")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./flow-C7J1hgdt.mjs");
var Route$1 = createFileRoute("/flow")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./method-DvUfyzeh.mjs");
var Route = createFileRoute("/method")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	BuildersRoute: Route$4.update({
		id: "/builders",
		path: "/builders",
		getParentRoute: () => Route$6
	}),
	CirculationRoute: Route$3.update({
		id: "/circulation",
		path: "/circulation",
		getParentRoute: () => Route$6
	}),
	EmissionRoute: Route$2.update({
		id: "/emission",
		path: "/emission",
		getParentRoute: () => Route$6
	}),
	FlowRoute: Route$1.update({
		id: "/flow",
		path: "/flow",
		getParentRoute: () => Route$6
	}),
	MethodRoute: Route.update({
		id: "/method",
		path: "/method",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { aggregate as a, projectScenario as c, formatDay as d, formatInt as f, shortAddr as h, DEST_KEYS as i, t as l, formatUsd as m, cn as n, destShare as o, formatPct as p, useBoard as r, destSum as s, router_exports as t, formatBem as u };
