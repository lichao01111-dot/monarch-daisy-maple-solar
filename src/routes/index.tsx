import { createFileRoute } from "@tanstack/react-router";
import { AccountingCompare } from "@/components/board/compare";
import { EcrHero } from "@/components/board/ecr-hero";
import { FactoryStrip } from "@/components/board/factory-strip";
import { SeriesChart } from "@/components/board/series-chart";
import { formatBem } from "@/lib/format";
import { useView } from "@/lib/use-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { agg, lang, c } = useView();

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <EcrHero agg={agg} lang={lang} />
      <FactoryStrip agg={agg} lang={lang} />
      <SeriesChart agg={agg} lang={lang} />
      <AccountingCompare agg={agg} lang={lang} />
      <p className="text-xs text-faint">
        {c.asOf} {agg.days.at(-1)?.date ?? "—"} · {c.price} ${agg.price.toFixed(2)} · {c.minerSells}{" "}
        {formatBem(agg.minerSells, 0)} BEM
      </p>
    </div>
  );
}
