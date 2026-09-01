import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calculator,
  CircleDot,
  Cpu,
  Layers,
  LayoutGrid,
  ScrollText,
  Workflow,
} from "lucide-react";
import { DieMark } from "@/components/board/mark";
import { ScenarioPanel } from "@/components/board/scenario-panel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { aggregate } from "@/lib/ledger";
import { t } from "@/lib/copy";
import { useBoard } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "navOverview" as const, icon: LayoutGrid },
  { to: "/emission", key: "navEmission" as const, icon: CircleDot },
  { to: "/flow", key: "navFlow" as const, icon: Workflow },
  { to: "/circulation", key: "navCirculation" as const, icon: Layers },
  { to: "/builders", key: "navBuilders" as const, icon: Cpu },
  { to: "/method", key: "navMethod" as const, icon: ScrollText },
];

export function BoardShell({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
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

  return (
    <div className="bg-fab min-h-dvh text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to ledger
      </a>
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-line bg-bg/80 px-4 py-6 backdrop-blur-sm lg:flex">
          <Link to="/" className="flex items-center gap-2 px-1 text-fg">
            <DieMark className="size-7" />
            <span className="flex flex-col leading-none">
              <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                TAPEOUT
              </span>
              <span className="mt-1 font-medium tracking-tight">{c.app}</span>
            </span>
          </Link>
          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                    active
                      ? "bg-raised text-fg"
                      : "text-muted hover:bg-raised/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4" />
                  {c[item.key]}
                </Link>
              );
            })}
          </nav>
          <p className="mt-auto px-1 text-[11px] leading-5 text-faint">{c.community}</p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
            <div className="flex flex-col gap-3 px-4 py-3 md:px-6">
              <div className="flex items-center justify-between gap-3 lg:hidden">
                <Link to="/" className="flex items-center gap-2">
                  <DieMark className="size-6" />
                  <span className="text-sm font-medium">{c.app}</span>
                </Link>
                <div className="flex items-center gap-1">
                  <LangToggle lang={resolvedLang} onChange={setLang} />
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="min-[1100px]:hidden"
                        aria-label={c.openScenario}
                      >
                        <Calculator className="size-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>{c.scenario}</SheetTitle>
                        <SheetDescription>{c.scenarioLead}</SheetDescription>
                      </SheetHeader>
                      <div className="overflow-y-auto px-6 pb-8">
                        <ScenarioPanel agg={agg} lang={resolvedLang} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Seg
                  value={resolvedMode}
                  onChange={setMode}
                  options={[
                    { id: "observed", label: c.observed },
                    { id: "pilot", label: c.pilot },
                  ]}
                />
                <Seg
                  value={resolvedPeriod}
                  onChange={setPeriod}
                  options={[
                    { id: "1d", label: c.period1 },
                    { id: "7d", label: c.period7 },
                    { id: "30d", label: c.period30 },
                  ]}
                />
                <div className="ml-auto hidden items-center gap-1 lg:flex">
                  <LangToggle lang={resolvedLang} onChange={setLang} />
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 min-[1100px]:hidden"
                      >
                        <Calculator className="size-4" />
                        {c.openScenario}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>{c.scenario}</SheetTitle>
                        <SheetDescription>{c.scenarioLead}</SheetDescription>
                      </SheetHeader>
                      <div className="overflow-y-auto px-6 pb-8">
                        <ScenarioPanel agg={agg} lang={resolvedLang} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <p className="text-xs text-faint">
                {resolvedMode === "pilot" ? c.pilotHint : c.observedHint}
              </p>
            </div>
          </header>

          <div className="flex flex-1 gap-6 px-4 py-5 pb-24 md:px-6 md:py-8 lg:pb-8">
            <main id="main" className="min-w-0 flex-1">
              {children}
            </main>
            <aside className="hidden w-80 shrink-0 min-[1100px]:block">
              <div className="sticky top-28">
                <ScenarioPanel agg={agg} lang={resolvedLang} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-sm lg:hidden">
        <ul className="grid grid-cols-6">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-0.5 px-0.5 text-[10px] leading-tight",
                    active ? "text-fg" : "text-muted",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="max-w-full truncate">{c[item.key]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Seg<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-md border border-line bg-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "h-9 rounded-sm px-2.5 text-xs font-medium transition-colors duration-150 sm:px-3",
            value === o.id ? "bg-fg text-bg" : "text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function LangToggle({
  lang,
  onChange,
}: {
  lang: "en" | "zh";
  onChange: (l: "en" | "zh") => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-line bg-surface p-0.5">
      {(["zh", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={cn(
            "h-9 min-w-11 rounded-sm px-2 font-mono text-[11px] tracking-wide",
            lang === l ? "bg-raised text-fg" : "text-muted",
          )}
        >
          {l === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}
