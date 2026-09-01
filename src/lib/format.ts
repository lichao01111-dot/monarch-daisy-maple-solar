export function formatBem(n: number, digits = 1): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (abs >= 10_000) return `${(n / 1_000).toFixed(1)}k`;
  if (abs >= 100) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(Math.min(digits, 1));
  if (abs === 0) return "0";
  return n.toFixed(digits);
}

export function formatUsd(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 10_000) return `${sign}$${(abs / 1_000).toFixed(1)}k`;
  if (abs >= 100) return `${sign}$${abs.toFixed(0)}`;
  if (abs === 0) return "$0";
  return `${sign}$${abs.toFixed(2)}`;
}

export function formatPct(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}

export function formatInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatDay(iso: string, lang: "en" | "zh"): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (lang === "zh") {
    return `${d.getUTCMonth() + 1}/${d.getUTCDate()}`;
  }
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function shortAddr(addr: string): string {
  if (addr.startsWith("0x") && addr.length > 12) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }
  return addr;
}
