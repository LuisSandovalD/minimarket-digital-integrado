import ModernButton from "./ModernButton";

export default function IconButton({
  icon,
  variant = "ghost",
  size = "icon",
  ...props
}) {
  return <ModernButton icon={icon} variant={variant} size={size} {...props} />;
}
