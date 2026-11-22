import { cn } from "@/lib/utils";
import { DiamondMark } from "./icons";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <DiamondMark className="icon-glow h-7 w-7 text-neon" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[0.95rem] font-normal tracking-[0.42em] uppercase">Diamond Shine</span>
        {!compact && (
          <span className="mt-1.5 text-[0.55rem] font-medium tracking-[0.5em] uppercase text-neon">
            Solarium · Puerto Banús
          </span>
        )}
      </span>
    </span>
  );
}
