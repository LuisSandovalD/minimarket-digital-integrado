import Badge from "./Badge";
import Card from "./Card";
import CardContent from "./CardContent";
import CardDescription from "./CardDescription";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import IconContainer from "./IconContainer";
import Trend from "./Trend";

export default function MetricCard({
  icon: Icon,
  value,
  subtitle,
  title,
  description,
  badge,
  actions,
  trend,
  trendLabel,
  footer,
  header,
  loading = false,
  children,
  variant = "default",
  className = "",
  ...props
}) {
  return (
    <Card variant={variant} className={className} {...props}>
      {header}

      {(Icon || badge || actions) && (
        <CardHeader align="center">
          {Icon && (
            <IconContainer variant={variant}>
              <Icon strokeWidth={2.2} />
            </IconContainer>
          )}

          <div className="ml-auto flex items-center gap-2">
            {badge &&
              (typeof badge === "string" ? <Badge>{badge}</Badge> : badge)}

            {actions}
          </div>
        </CardHeader>
      )}

      <CardContent className="mt-5 flex flex-col">
        {loading ? (
          <>
            <div className="h-5 w-24 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-3 h-7 w-40 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
          </>
        ) : (
          <>
            {subtitle && (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#6096ba] dark:text-[#a3cef1]">
                {subtitle}
              </p>
            )}

            {value && (
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  {value}
                </h2>

                {trend !== undefined && (
                  <Trend value={trend} label={trendLabel} />
                )}
              </div>
            )}

            {title && <CardTitle className="mb-3">{title}</CardTitle>}

            {description && (
              <CardDescription className="leading-7">
                {description}
              </CardDescription>
            )}

            {children && <div className="mt-auto pt-6">{children}</div>}
          </>
        )}
      </CardContent>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
