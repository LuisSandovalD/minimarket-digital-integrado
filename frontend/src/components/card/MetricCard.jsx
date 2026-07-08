// components/MetricCard.jsx
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
    <Card
      variant={variant}
      className={`group relative overflow-hidden rounded-2xl border border-[#d7e0e7] bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#89c2d9]/60 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] ${className}`}
      {...props}
    >
      {/* Resplandor sutil de fondo */}
      <div className="absolute right-[-20px] top-[-20px] -z-10 h-24 w-24 rounded-full bg-[#6096ba]/5 blur-2xl transition-opacity duration-300 group-hover:bg-[#89c2d9]/15" />

      {header}

      {(Icon || badge || actions) && (
        <CardHeader align="center" className="gap-2">
          {Icon && (
            <IconContainer
              variant={variant}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#274c77] to-[#6096ba] text-white shadow-md transition-transform duration-300 group-hover:scale-105"
            >
              <Icon strokeWidth={2.2} size={18} />
            </IconContainer>
          )}
          <div className="ml-auto flex items-center gap-1.5">
            {badge &&
              (typeof badge === "string" ? (
                <Badge className="bg-[#89c2d9]/10 text-[#6096ba] border border-[#89c2d9]/30 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
                  {badge}
                </Badge>
              ) : (
                badge
              ))}
            {actions}
          </div>
        </CardHeader>
      )}

      <CardContent className="mt-3 flex flex-col">
        {loading ? (
          <>
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-2 h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
          </>
        ) : (
          <>
            {subtitle && (
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#6096ba] dark:text-[#a3cef1]">
                {subtitle}
              </p>
            )}

            {value && (
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {value}
                </h2>
                {trend !== undefined && (
                  <Trend value={trend} label={trendLabel} />
                )}
              </div>
            )}

            {title && (
              <CardTitle className="mb-1 text-base font-black text-slate-900 dark:text-white">
                {title}
              </CardTitle>
            )}

            {description && (
              <CardDescription className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                {description}
              </CardDescription>
            )}

            {children && <div className="mt-2 pt-2">{children}</div>}
          </>
        )}
      </CardContent>

      {footer && <CardFooter className="mt-2 pt-2">{footer}</CardFooter>}
    </Card>
  );
}
