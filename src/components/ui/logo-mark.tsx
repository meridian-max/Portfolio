import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  ariaLabel?: string;
};

export function LogoMark({ className, ariaLabel = "GreedUp logo" }: LogoMarkProps) {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn("relative inline-block size-9 shrink-0", className)}
    >
      <Image
        src="/logo/greedup-mark.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 80px, 56px"
        className="object-contain"
        priority
      />
    </span>
  );
}
