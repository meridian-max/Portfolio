import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  ariaLabel?: string;
};

export function LogoMark({ className, ariaLabel = "GreedUp logo" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={cn("size-9", className)}
    >
      <rect x="9" y="11" width="48" height="48" rx="11" className="fill-foreground opacity-20" />
      <rect
        x="6"
        y="6"
        width="50"
        height="50"
        rx="11"
        strokeWidth="3.5"
        className="fill-background stroke-foreground"
      />
      <path
        d="M44 21a17 17 0 1 0 2 21H34"
        strokeWidth="4.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-foreground"
      />
      <path
        d="M34 42l16-16m0 0v13m0-13H37"
        strokeWidth="4.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[hsl(var(--luxury))]"
      />
      <circle
        cx="50"
        cy="15"
        r="5"
        strokeWidth="3"
        className="fill-[hsl(var(--luxury))] stroke-foreground"
      />
    </svg>
  );
}
