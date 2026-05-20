// ========================================
// components/users/UserActions.jsx
// ========================================

import { ChevronRight, Edit2, Power } from "lucide-react";

import ModernButton from "@/components/buttons/ModernButton";

import { NEXT_ROLE, BUTTON_LABEL } from "./constants/roleConfig";

export default function UserActions({
  user,

  onEdit,

  onToggleStatus,

  onViewChildren,
}) {
  return (
    <div className="flex items-center gap-2">
      <ModernButton
        text=""
        icon={Edit2}
        variant="warning"
        size="sm"
        onClick={() => onEdit?.(user)}
      />

      <ModernButton
        text=""
        icon={Power}
        variant={user.isActive ? "danger" : "success"}
        size="sm"
        onClick={() => onToggleStatus?.(user.id)}
      />
    </div>
  );
}
