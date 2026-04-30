import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  ariaLabel?: string;
};

export function LogoMark({ className, ariaLabel = "Meridian Works" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label={ariaLabel}
      className={cn("size-9", className)}
    >
      <rect
        x="0"
        y="0"
        width="64"
        height="64"
        rx="14"
        className="fill-foreground"
      />
      <path
        d="M16 46 L16 18 L32 34 L48 18 L48 46"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-background"
      />
      <circle
        cx="51"
        cy="15"
        r="3.2"
        className="fill-[hsl(var(--luxury))]"
      />
    </svg>
  );
}
