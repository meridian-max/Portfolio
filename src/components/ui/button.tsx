import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-black uppercase tracking-[0.04em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-2 border-border bg-primary text-primary-foreground shadow-[5px_5px_0_hsl(var(--foreground)/0.22)] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_hsl(var(--foreground)/0.2)]",
        destructive:
          "border-2 border-destructive bg-destructive text-destructive-foreground shadow-[5px_5px_0_hsl(var(--foreground)/0.18)] hover:-translate-y-0.5",
        outline:
          "border-2 border-border bg-background text-foreground shadow-[5px_5px_0_hsl(var(--foreground)/0.18)] hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border-2 border-border bg-secondary text-secondary-foreground shadow-[5px_5px_0_hsl(var(--foreground)/0.18)] hover:-translate-y-0.5",
        ghost: "border-2 border-transparent shadow-none hover:border-border hover:bg-background",
        link: "rounded-none border-0 px-0 text-primary underline-offset-4 shadow-none hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 py-3",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
