export type Period = "1d" | "7d" | "30d";
export type Mode = "observed" | "pilot";

export type Destinations = {
  retired: number;
  timeLocked: number;
  settlementLiquidity: number;
  builderBounty: number;
  securityReserve: number;
  executionVault: number;
};

export const DEST_KEYS = [
  "retired",
  "timeLocked",
  "settlementLiquidity",
  "builderBounty",
  "securityReserve",
  "executionVault",
] as const;

export type DestKey = (typeof DEST_KEYS)[number];

export type DayRow = {
  date: string;
  emission: number;
  volumeUsd: number;
  feeUsd: number;
  acquired: number;
  dest: Destinations;
  nand: number;
  latch: number;
  circuits: number;
  miners: number;
  minerSells: number;
  processorSink: number;
  bnnSink: number;
};

export type ExecutionWindow = {
  id: string;
  openedAt: string;
  budgetUsd: number;
  filledBem: number;
  price: number;
  impactPct: number;
  status: "filled" | "skipped";
  reason?: string;
  dest: Destinations;
};

export type BuilderWork = {
  id: string;
  date: string;
  kind: "circuit" | "component" | "pod" | "docs";
  title: string;
  author: string;
  transistors: number;
  podScore: number | null;
  bountyBem: number;
};

export type Scenario = {
  volumeUsd: number;
  feeBps: number;
  buyShare: number;
  retire: number;
  lock: number;
  pol: number;
  bounty: number;
  reserve: number;
};

export type Aggregate = {
  days: DayRow[];
  emission: number;
  acquired: number;
  ecr: number;
  naiveDemand: number;
  naiveEcr: number;
  dest: Destinations;
  feeUsd: number;
  volumeUsd: number;
  nand: number;
  latch: number;
  circuits: number;
  minersAvg: number;
  minerSells: number;
  processorSink: number;
  bnnSink: number;
  productiveSinks: number;
  supplyStart: number;
  supplyEnd: number;
  lockedEnd: number;
  burnedEnd: number;
  windows: ExecutionWindow[];
  builders: BuilderWork[];
  price: number;
};

export const BEM_PRICE = 15.08;
export const GENESIS_SUPPLY = 25_840;
export const TODAY = "2026-09-01";
export const DAY_COUNT = 30;

const PILOT_START = "2026-08-20";

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function emptyDest(): Destinations {
  return {
    retired: 0,
    timeLocked: 0,
    settlementLiquidity: 0,
    builderBounty: 0,
    securityReserve: 0,
    executionVault: 0,
  };
}

function scaleDest(weight: Destinations, acquired: number): Destinations {
  const total =
    weight.retired +
    weight.timeLocked +
    weight.settlementLiquidity +
    weight.builderBounty +
    weight.securityReserve +
    weight.executionVault;
  if (total <= 0 || acquired <= 0) return emptyDest();
  const raw: Destinations = {
    retired: (weight.retired / total) * acquired,
    timeLocked: (weight.timeLocked / total) * acquired,
    settlementLiquidity: (weight.settlementLiquidity / total) * acquired,
    builderBounty: (weight.builderBounty / total) * acquired,
    securityReserve: (weight.securityReserve / total) * acquired,
    executionVault: (weight.executionVault / total) * acquired,
  };
  const sum = destSum(raw);
  const drift = acquired - sum;
  raw.retired += drift;
  return raw;
}

export function destSum(d: Destinations): number {
  return (
    d.retired +
    d.timeLocked +
    d.settlementLiquidity +
    d.builderBounty +
    d.securityReserve +
    d.executionVault
  );
}

function addDest(a: Destinations, b: Destinations): Destinations {
  return {
    retired: a.retired + b.retired,
    timeLocked: a.timeLocked + b.timeLocked,
    settlementLiquidity: a.settlementLiquidity + b.settlementLiquidity,
    builderBounty: a.builderBounty + b.builderBounty,
    securityReserve: a.securityReserve + b.securityReserve,
    executionVault: a.executionVault + b.executionVault,
  };
}

const PILOT_WEIGHT: Destinations = {
  retired: 0.3,
  timeLocked: 0.1,
  settlementLiquidity: 0.2,
  builderBounty: 0.3,
  securityReserve: 0.05,
  executionVault: 0.05,
};

const CIRCUIT_TITLES = [
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
  "Reset synchronizer",
];

const AUTHORS = [
  "0x8c1a2b9d44e0aa71",
  "0x3f70c11e90ab66d2",
  "nandpunk",
  "0xa91e04cc77b12f08",
  "latchwork",
  "0x12d0bb4e83c9f1aa",
  "siliconsmith",
  "0x77e2c0d5ab194403",
  "pod-lab",
  "0xbe0f19a6c4d338e1",
];

function buildDays(mode: Mode): DayRow[] {
  const rng = mulberry32(mode === "pilot" ? 20260901 : 19940712);
  const start = addDays(TODAY, -(DAY_COUNT - 1));
  const days: DayRow[] = [];

  for (let i = 0; i < DAY_COUNT; i++) {
    const date = addDays(start, i);
    const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
    const weekend = dow === 0 || dow === 6;
    const wave = 0.5 + 0.5 * Math.sin(i / 4.2);
    const emission = (weekend ? 78 : 118) + wave * 28 + rng() * 14;
    const circuits = Math.max(2, Math.round((weekend ? 4 : 8) + rng() * 7));
    const nand = Math.round(circuits * (32 + rng() * 48));
    const latch = Math.round(circuits * (9 + rng() * 14));
    const miners = Math.round(48 + wave * 22 + rng() * 12);
    const minerSells = emission * (0.38 + rng() * 0.16);

    let volumeUsd = 0;
    let feeUsd = 0;
    let acquired = 0;
    let dest = emptyDest();

    if (mode === "pilot" && date >= PILOT_START) {
      const age = Math.max(
        0,
        (new Date(`${date}T00:00:00Z`).getTime() -
          new Date(`${PILOT_START}T00:00:00Z`).getTime()) /
          86_400_000,
      );
      const ramp = Math.min(1, 0.35 + age / 18);
      volumeUsd = (weekend ? 7_200 : 18_400) * ramp * (0.75 + rng() * 0.55);
      const feeBps = 8;
      feeUsd = volumeUsd * (feeBps / 10_000);
      const buyShare = 0.5;
      acquired = (feeUsd * buyShare) / BEM_PRICE;
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
      bnnSink: 0,
    });
  }

  for (const d of days) {
    const s = destSum(d.dest);
    if (Math.abs(s - d.acquired) > 0.02) {
      d.dest.retired += d.acquired - s;
    }
  }

  return days;
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
function round4(n: number) {
  return Math.round(n * 10_000) / 10_000;
}
function roundDest(d: Destinations): Destinations {
  return {
    retired: round4(d.retired),
    timeLocked: round4(d.timeLocked),
    settlementLiquidity: round4(d.settlementLiquidity),
    builderBounty: round4(d.builderBounty),
    securityReserve: round4(d.securityReserve),
    executionVault: round4(d.executionVault),
  };
}

function buildWindows(days: DayRow[]): ExecutionWindow[] {
  const windows: ExecutionWindow[] = [];
  for (const d of days) {
    if (d.acquired <= 0) continue;
    const budgetUsd = d.feeUsd * 0.5;
    const impact = 0.0036 + (d.volumeUsd > 28_000 ? 0.0014 : 0.0022);
    const skipped = false;
    windows.push({
      id: `wnd-${d.date}`,
      openedAt: `${d.date}T00:00:00Z`,
      budgetUsd: round2(budgetUsd),
      filledBem: skipped ? 0 : d.acquired,
      price: BEM_PRICE,
      impactPct: round4(impact),
      status: skipped ? "skipped" : "filled",
      reason: skipped ? "max-price-impact" : undefined,
      dest: skipped ? emptyDest() : d.dest,
    });
  }
  return windows;
}

function buildBuilders(days: DayRow[], mode: Mode): BuilderWork[] {
  const rng = mulberry32(mode === "pilot" ? 77 : 41);
  const works: BuilderWork[] = [];
  let n = 0;
  for (const d of days) {
    const count = d.circuits;
    const bountyPool = d.dest.builderBounty;
    const per = count > 0 ? bountyPool / count : 0;
    for (let i = 0; i < count; i++) {
      n += 1;
      const kindRoll = rng();
      const kind: BuilderWork["kind"] =
        kindRoll > 0.86 ? "component" : kindRoll > 0.72 ? "pod" : kindRoll > 0.64 ? "docs" : "circuit";
      works.push({
        id: `w-${n.toString().padStart(3, "0")}`,
        date: d.date,
        kind,
        title: CIRCUIT_TITLES[Math.floor(rng() * CIRCUIT_TITLES.length)]!,
        author: AUTHORS[Math.floor(rng() * AUTHORS.length)]!,
        transistors: Math.round(18 + rng() * 220),
        podScore: kind === "docs" ? null : Math.round(62 + rng() * 36),
        bountyBem: round4(per),
      });
    }
  }
  return works;
}

const CACHE: Record<Mode, { days: DayRow[]; windows: ExecutionWindow[]; builders: BuilderWork[] }> =
  {
    observed: (() => {
      const days = buildDays("observed");
      return { days, windows: buildWindows(days), builders: buildBuilders(days, "observed") };
    })(),
    pilot: (() => {
      const days = buildDays("pilot");
      return { days, windows: buildWindows(days), builders: buildBuilders(days, "pilot") };
    })(),
  };

export function periodDays(period: Period): number {
  if (period === "1d") return 1;
  if (period === "7d") return 7;
  return 30;
}

function slicePeriod<T extends { date: string }>(rows: T[], period: Period): T[] {
  const n = periodDays(period);
  return rows.slice(-n);
}

export function aggregate(mode: Mode, period: Period): Aggregate {
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
    price: BEM_PRICE,
  };
}

export const DEFAULT_SCENARIO: Scenario = {
  volumeUsd: 25_000,
  feeBps: 8,
  buyShare: 0.5,
  retire: 30,
  lock: 10,
  pol: 20,
  bounty: 30,
  reserve: 10,
};

export function projectScenario(
  base: Aggregate,
  scenario: Scenario,
): { acquired: number; ecr: number; feeUsd: number; dest: Destinations } {
  const n = base.days.length || 1;
  const feeUsd = scenario.volumeUsd * (scenario.feeBps / 10_000) * n;
  const acquired = (feeUsd * scenario.buyShare) / BEM_PRICE;
  const dest = scaleDest(
    {
      retired: scenario.retire,
      timeLocked: scenario.lock,
      settlementLiquidity: scenario.pol,
      builderBounty: scenario.bounty,
      securityReserve: scenario.reserve,
      executionVault: 0,
    },
    acquired,
  );
  const ecr = base.emission > 0 ? acquired / base.emission : 0;
  return { acquired, ecr, feeUsd, dest };
}

export function destShare(dest: Destinations, key: DestKey): number {
  const s = destSum(dest);
  if (s <= 0) return 0;
  return dest[key] / s;
}
