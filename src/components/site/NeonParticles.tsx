import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * A few slow-drifting points of cyan light. Positions are deterministic (no Math.random)
 * so server and client render the same markup; only ~60% of them show on phones.
 * Hidden entirely when the visitor prefers reduced motion (see styles.css).
 */
export function NeonParticles({ count = 12, className }: { count?: number; className?: string }) {
  const mobileLimit = Math.ceil(count * 0.6);
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const style = {
          left: `${(i * 61.8 + 7) % 100}%`,
          top: `${(i * 37.7 + 18) % 92}%`,
          "--p-size": `${2 + (i % 3) * 0.75}px`,
          "--p-duration": `${16 + ((i * 7) % 13)}s`,
          "--p-delay": `${-((i * 2.9) % 20)}s`,
          "--p-dx": `${(i % 2 ? 1 : -1) * (14 + ((i * 11) % 26))}px`,
          "--p-opacity": `${0.45 + (i % 4) * 0.12}`,
        } as CSSProperties;
        return <span key={i} className={cn("neon-particle", i >= mobileLimit && "max-md:hidden")} style={style} />;
      })}
    </div>
  );
}
