import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "default" | "sm" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "bg-cocoa text-background shadow-soft hover:bg-berry hover:shadow-lift",
  secondary:
    "border border-cocoa/20 bg-background/50 backdrop-blur-sm text-cocoa hover:border-cocoa/35 hover:bg-background/80",
  ghost: "border border-transparent hover:border-cocoa/10 hover:bg-background hover:text-cocoa",
  inverse: "bg-background text-cocoa shadow-soft hover:bg-blush",
};

const sizeClass: Record<Size, string> = {
  default: "min-h-[48px] px-7 py-3 text-[0.94rem]",
  sm: "min-h-[40px] px-5 py-2.5 text-[0.88rem]",
  lg: "min-h-[52px] px-8 py-3.5 text-base",
};

export interface CTAProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

/**
 * CTA primitive — deep seam for the repeated pressable rounded-full pattern.
 * Interface: variant + size. Depth: hides pressable/cocoa/berry/transition tokens.
 */
export function CTA({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: CTAProps) {
  return (
    <a
      className={cn(
        "pressable inline-flex items-center justify-center rounded-full font-[600] tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color] duration-200 ease-out active:scale-[0.97] touch-target",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function CTAButton({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "pressable inline-flex items-center justify-center rounded-full font-[600] tracking-[-0.01em] transition-[transform,background-color,box-shadow,border-color] duration-200 ease-out active:scale-[0.97] touch-target",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
