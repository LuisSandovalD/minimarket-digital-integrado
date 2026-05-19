import { Save } from "lucide-react";
import ModernButton from "./ModernButton";

export default function SubmitButton({
  text = "Guardar",
  icon = Save,
  loading = false,
  ...props
}) {
  return (
    <ModernButton
      type="submit"
      text={text}
      icon={icon}
      loading={loading}
      variant="primary"
      {...props}
    />
  );
}