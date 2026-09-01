import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_SCENARIO,
  type Mode,
  type Period,
  type Scenario,
} from "@/lib/ledger";

export type Lang = "en" | "zh";

type BoardState = {
  period: Period;
  mode: Mode;
  lang: Lang;
  scenario: Scenario;
  setPeriod: (period: Period) => void;
  setMode: (mode: Mode) => void;
  setLang: (lang: Lang) => void;
  setScenario: (patch: Partial<Scenario>) => void;
  resetScenario: () => void;
};

export const useBoard = create<BoardState>()(
  persist(
    (set) => ({
      period: "7d",
      mode: "observed",
      lang: "zh",
      scenario: { ...DEFAULT_SCENARIO },
      setPeriod: (period) => set({ period }),
      setMode: (mode) => set({ mode }),
      setLang: (lang) => set({ lang }),
      setScenario: (patch) =>
        set((s) => ({ scenario: { ...s.scenario, ...patch } })),
      resetScenario: () => set({ scenario: { ...DEFAULT_SCENARIO } }),
    }),
    { name: "bem-workboard-v2", partialize: (s) => ({ lang: s.lang }) },
  ),
);
