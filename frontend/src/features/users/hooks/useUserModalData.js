// ========================================
// hooks/useUserModalData.js
// ========================================

import { useMemo } from "react";

export function useUserModalData({
  formData,
  allUsers,
  isEdit,
  user,
  handleChange,
}) {
  // ========================================
  // FILTRADO DINÁMICO DE RESPONSABLES (Jerarquía Corporativa)
  // ========================================
  // hooks/useUserModalData.js
  const availableManagers = useMemo(() => {
    if (formData.role === "ADMIN") return [];
    if (!Array.isArray(allUsers)) return [];

    return allUsers.filter((u) => {
      if (isEdit && (u.id === user?.id || u._id === user?._id)) return false;

      // 🌟 Convertimos a mayúsculas para evitar fallos por formato del backend
      const userRole = u.role?.toUpperCase();
      const currentFormRole = formData.role?.toUpperCase();

      if (currentFormRole === "MANAGER") return userRole === "ADMIN";
      if (currentFormRole === "SUPERVISOR") return userRole === "MANAGER";
      if (currentFormRole === "EMPLOYEE") return userRole === "SUPERVISOR";

      return false;
    });
  }, [allUsers, formData.role, isEdit, user]);
  // ========================================
  // AUTO-ASIGNACIÓN DE SUCURSAL POR JEFE DIRECTO
  // ========================================
  const handleSelectManager = (mgr) => {
    const mgrId = mgr.id || mgr._id;

    handleChange({
      target: { name: "managerId", value: mgrId },
    });

    const targetBranchId = mgr.branchId || mgr.branch?.id || mgr.branch?._id;
    if (targetBranchId) {
      handleChange({
        target: { name: "branchId", value: targetBranchId },
      });
    }
  };

  // Condición lógica para bloquear y heredar la sucursal de manera reactiva
  const isBranchInherited =
    formData.role === "SUPERVISOR" || formData.role === "EMPLOYEE";

  return {
    availableManagers,
    handleSelectManager,
    isBranchInherited,
  };
}
