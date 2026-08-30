import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "background" | "blush" | "linen" | "cocoa" | "transparent";
type Divider = "wavy" | "line" | "none";

const toneClass: Record<Tone, string> = {
  background: "bg-background",
  blush: "bg-blush",
  linen: "bg-linen",
  cocoa: "bg-cocoa text-background",
  transparent: "bg-transparent",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  divider?: Divider;
  dividerPosition?: "top" | "bottom" | "none";
  className?: string;
  containerClassName?: string;
  as?: "section" | "footer" | "div";
  children: ReactNode;
}

export function Section({
  id,
  tone = "background",
  divider = "none",
  dividerPosition = "none",
  className,
  containerClassName,
  as: Tag = "section",
  children,
}: SectionProps) {
  const hasWavy = divider === "wavy";
  const hasLine = divider === "line";

  return (
    <Tag
      id={id}
      className={cn(
        "relative scroll-mt-20 overflow-hidden py-12 sm:py-16",
        toneClass[tone],
        className,
      )}
    >
      {hasLine && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cocoa/10 to-transparent"
        />
      )}
      {hasWavy && dividerPosition === "top" && (
        <div aria-hidden className="wavy-divider absolute top-0 inset-x-0 opacity-50" />
      )}
      {hasWavy && dividerPosition === "bottom" && (
        <div aria-hidden className="wavy-divider absolute bottom-0 inset-x-0" />
      )}
      <div className={cn("relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

interface SectionHeaderProps {
  kicker?: string;
  kickerClassName?: string;
  heading: ReactNode;
  accent?: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  kicker,
  kickerClassName,
  heading,
  accent,
  copy,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}
    >
      {kicker && <p className={cn("kicker", kickerClassName)}>{kicker}</p>}
      <h2
        className={cn(
          "mt-4 font-display font-[650] tracking-[-0.03em] text-balance",
          // unified clamp — single source of truth
          "text-[clamp(2rem,4.8vw,3.3rem)] leading-[0.97]",
          "text-cocoa",
          align === "center" && "mx-auto",
        )}
      >
        {heading}
        {accent && <span className="italic font-normal text-cocoa/55"> {accent}</span>}
      </h2>
      {copy && (
        <p className="mt-4 max-w-[46ch] text-[0.92rem] leading-[1.6] text-cocoa/60">{copy}</p>
      )}
    </div>
  );
}
