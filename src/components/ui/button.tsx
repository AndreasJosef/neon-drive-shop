import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Neon variants for the arcade aesthetic
        neon: "bg-gradient-primary text-primary-foreground font-display font-bold tracking-wider border border-neon-cyan/50 glow-cyan hover:glow-cyan hover:border-neon-cyan hover:shadow-neon-cyan transition-all duration-300",
        "neon-outline": "border-2 border-neon-cyan bg-transparent text-neon-cyan font-display font-bold tracking-wider hover:bg-neon-cyan hover:text-background transition-all duration-300 hover:glow-cyan",
        "neon-magenta": "bg-gradient-accent text-foreground font-display font-bold tracking-wider border border-neon-magenta/50 glow-magenta hover:glow-magenta hover:border-neon-magenta transition-all duration-300",
        "neon-purple": "bg-accent text-accent-foreground font-display font-bold tracking-wider border border-neon-purple/50 glow-purple hover:glow-purple hover:border-neon-purple transition-all duration-300",
        arcade: "bg-gradient-secondary text-foreground font-display uppercase tracking-widest border border-neon-purple/30 hover:border-neon-purple hover:glow-purple transition-all duration-300"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
