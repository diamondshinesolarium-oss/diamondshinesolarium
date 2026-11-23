import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-sm font-sans text-[0.6875rem] font-medium uppercase tracking-[0.24em] cursor-pointer transition-all duration-500 ease-[var(--ease-luxe)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-border bg-panel text-foreground hover:border-neon hover:text-neon hover:shadow-neon-soft",
        neon: "neon-breathe bg-neon text-ink hover:bg-neon-hover hover:-translate-y-0.5",
        outline: "border border-neon/50 bg-ink/40 text-foreground hover:border-neon hover:text-neon hover:shadow-neon-soft",
        outlineLight:
          "border border-neon/45 bg-ink/30 text-ink-foreground backdrop-blur-sm hover:border-neon hover:text-neon hover:shadow-neon-soft",
        ghost: "text-foreground hover:bg-accent hover:text-neon",
        ghostLight: "text-ink-foreground hover:text-neon",
        whatsapp: "bg-whatsapp text-whatsapp-foreground hover:brightness-110",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
        link: "px-0 text-neon underline-offset-8 hover:underline hover:text-neon-hover",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5",
        lg: "h-14 px-9",
        icon: "h-11 w-11 tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
