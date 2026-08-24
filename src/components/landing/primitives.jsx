import { Button, Heading, IconButton, Text } from "@medusajs/ui";
import { cn } from "./cn";

export function Container({ className, children, ...props }) {
  return (
    <div className={cn("mx-auto w-full max-w-landing px-5 md:px-7", className)} {...props}>
      {children}
    </div>
  );
}

export function Section({ id, className, children }) {
  return (
    <section id={id} className={cn("border-t border-zinc-200 py-14 md:py-[76px]", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ dot = false, className, children }) {
  return (
    <span
      className={cn(
        "mb-4 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.075em] text-zinc-600",
        className,
      )}
    >
      {dot ? (
        <i className="inline-block h-1.5 w-1.5 rounded-full bg-hull-green shadow-[0_0_0_3px_#10b98138]" aria-hidden />
      ) : null}
      {children}
    </span>
  );
}

export function DisplayHeading({ as = "h2", className, children }) {
  return (
    <Heading
      level={as}
      className={cn("font-display tracking-tight text-ink mb-8", className)}
    >
      {children}
    </Heading>
  );
}

export function BodyText({ className, children }) {
  return (
    <Text leading="normal" className={cn("max-w-[455px] text-[15.5px] leading-relaxed text-zinc-600", className)}>
      {children}
    </Text>
  );
}

export function TextLink({ href, children }) {
  return (
    <a
      href={href}
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-hull-green-text [&>svg]:h-4 [&>svg]:w-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
    >
      {children}
    </a>
  );
}

export function WindowDots() {
  return (
    <>
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
    </>
  );
}

export function LandingButton({
  href,
  target,
  rel,
  variant = "primary",
  size = "base",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-transform hover:-translate-y-px [&>svg]:h-4 [&>svg]:w-4",
    variant === "primary" &&
    "bg-ink text-white shadow-[0_9px_20px_-12px_rgba(11,11,12,0.9)] hover:bg-zinc-800 hover:shadow-[0_14px_24px_-14px_rgba(16,185,129,0.65)]",
    variant === "secondary" && "border border-zinc-300 bg-white text-ink hover:bg-zinc-50",
    variant === "ghost" && "border border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700",
    variant === "accent" &&
    "bg-[#0066CC] text-white shadow-none hover:bg-[#0066CC] hover:text-white",
    className,
  );

  if (href) {
    return (
      <Button asChild variant="secondary" size={size} className={classes} {...props}>
        <a href={href} target={target} rel={rel}>
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button variant="secondary" size={size} className={classes} {...props}>
      {children}
    </Button>
  );
}

export function LandingIconButton({ href, label, className, children, ...props }) {
  const classes = cn("h-9 w-9 border border-zinc-300 bg-white text-ink hover:bg-zinc-100", className);

  if (href) {
    return (
      <IconButton asChild variant="transparent" className={classes} {...props}>
        <a href={href} aria-label={label} target="_blank" rel="noreferrer">
          {children}
        </a>
      </IconButton>
    );
  }

  return (
    <IconButton variant="transparent" className={classes} aria-label={label} {...props}>
      {children}
    </IconButton>
  );
}
