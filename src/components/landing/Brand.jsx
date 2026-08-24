import { ChartActivity } from "@medusajs/icons";

export function Brand() {
  return (
    <a href="#top" className="flex items-center gap-2.5 text-base font-bold text-ink no-underline">
      <span className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-ink text-white [&>svg]:h-[17px] [&>svg]:w-[17px]">
        <ChartActivity />
      </span>
      Hullbay
    </a>
  );
}
