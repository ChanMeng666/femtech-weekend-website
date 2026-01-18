import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-primary-foreground shadow hover:bg-primary-dark hover:scale-[1.02] hover:shadow-md": variant === "default",
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:scale-[1.02] hover:shadow-md": variant === "destructive",
            "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:scale-[1.02]": variant === "outline",
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:scale-[1.02] hover:shadow-md": variant === "secondary",
            "hover:bg-accent/60 hover:text-accent-foreground hover:scale-[1.02]": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
            "h-9 px-5 py-2": size === "default",
            "h-8 px-4 text-xs": size === "sm",
            "h-10 px-8": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
