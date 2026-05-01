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
      <rect x="6" y="6" width="52" height="52" rx="10" className="fill-background" />
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="10"
        strokeWidth="4"
        className="stroke-[hsl(var(--luxury))]"
      />
      <path
        d="M16 46 L16 18 L32 34 L48 18 L48 46"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-foreground"
      />
      <circle cx="51" cy="15" r="4" className="fill-[hsl(var(--luxury))]" />
    </svg>
  );
}
