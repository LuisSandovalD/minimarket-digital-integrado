// ========================================
// CREATE SALE MODAL
// Reutilizando HeaderModal + FooterModal
// ========================================

import React from "react";

import { ShoppingCart } from "lucide-react";

import HeaderModal from "@/components/modals/HeaderModal";

import FooterModal from "@/components/modals/FooterModal";

import ModernButton from "@/components/buttons/ModernButton";

import { SaleForm } from "../forms/SaleForm";

export const SaleCreateModal = ({ open, onClose, onSubmit }) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50
        backdrop-blur-sm

        p-4
      "
    >
      {/* MODAL */}
      <div
        className="
          w-full
          max-w-4xl

          overflow-hidden
          rounded-3xl

          border
          border-white/10

          bg-white
          shadow-2xl

          dark:bg-[#0f172a]
        "
      >
        {/* HEADER */}
        <HeaderModal
          icon={ShoppingCart}
          title="Nueva Venta"
          subtitle="
            Registra una nueva venta
            y agrega productos rápidamente.
          "
          onClose={onClose}
        />

        {/* BODY */}
        <div
          className="
            max-h-[70vh]
            overflow-y-auto
            p-6
          "
        >
          <SaleForm onSubmit={onSubmit} />
        </div>

        {/* FOOTER */}
        <FooterModal align="between">
          <ModernButton text="Cancelar" variant="secondary" onClick={onClose} />

          <div className="flex items-center gap-3">
            <ModernButton text="Cerrar" variant="ghost" onClick={onClose} />
          </div>
        </FooterModal>
      </div>
    </div>
  );
};
