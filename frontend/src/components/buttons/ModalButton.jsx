import { X } from "lucide-react";
import ModernButton from "./ModernButton";

export default function ModalButton({
  text = "Cerrar",
  icon = X,
  variant = "ghost",
  close = false,
  setOpen,

  ...props
}) {
  const handleModal = () => {
    if (close && setOpen) {
      setOpen(false);
    }

    if (!close && setOpen) {
      setOpen(true);
    }
  };

  return <ModernButton text={text} icon={icon} variant={variant} onClick={handleModal} {...props} />;
}
