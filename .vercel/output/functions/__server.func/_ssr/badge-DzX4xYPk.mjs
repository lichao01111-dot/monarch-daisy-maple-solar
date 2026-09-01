import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./router-C8dR2mc3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DzX4xYPk.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "border-line bg-raised text-muted",
		accent: "border-transparent bg-accent text-accent-fg",
		ok: "border-transparent bg-ok/15 text-ok",
		danger: "border-transparent bg-danger/15 text-danger"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
