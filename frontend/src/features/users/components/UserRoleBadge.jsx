// ========================================
// components/users/UserRoleBadge.jsx
// ========================================

import { ROLE_CONFIG } from "./constants/roleConfig";

export default function UserRoleBadge({ role }) {
  const config = ROLE_CONFIG[role];

  const Icon = config.icon;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        ${config.className}
      `}
    >
      <Icon size={14} />

      {role}
    </div>
  );
}
