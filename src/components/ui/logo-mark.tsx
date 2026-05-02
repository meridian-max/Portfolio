import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  ariaLabel?: string;
};

export function LogoMark({ className, ariaLabel = "GreedUp logo" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 180 150"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={cn("size-9", className)}
    >
      <path
        d="M153 23H94C55 23 27 52 27 90c0 40 31 70 72 70 26 0 49-12 63-31"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#1d1b26]"
      />
      <path
        d="M27 113c22 34 78 47 124 14"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#1d1b26]"
      />
      <path
        d="M101 65h58c3.4 0 6 2.6 6 6v58h-26V99l-47 47H56l66-66h-21Z"
        className="fill-[#9900ff]"
      />
    </svg>
  );
}
