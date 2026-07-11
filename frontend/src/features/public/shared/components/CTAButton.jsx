import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20",
  secondary:
    "bg-transparent text-foreground border border-border hover:bg-muted",
  dark: "bg-dark text-dark-foreground hover:bg-dark/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  ghost: "bg-transparent text-primary hover:bg-primary/5",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function CTAButton({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  full = false,
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
    VARIANTS[variant]
  } ${SIZES[size]} ${full ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {children}
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
