// ========================================
// features/account/components/AccountDangerZone.jsx
// ========================================

import { useState } from "react";

import { Trash2 } from "lucide-react";

import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountDangerZone() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <section
        className="
          pt-6
          border-t

          border-slate-200
          dark:border-slate-800
        "
      >
        <div
          className="
            mb-4
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-xl

              bg-red-100/50
              dark:bg-red-900/20
            "
          >
            <Trash2
              size={18}
              className="
                text-red-600
                dark:text-red-400
              "
            />
          </div>

          <div>
            <h3
              className="
                text-sm
                font-semibold

                text-red-600
                dark:text-red-400
              "
            >
              Zona de riesgo
            </h3>

            <p
              className="
                text-xs
                text-red-500
              "
            >
              Acciones irreversibles
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenDeleteModal(true)}
          className="
            w-full

            rounded-lg
            border

            border-red-200
            dark:border-red-900/50

            bg-red-50/50
            dark:bg-red-900/10

            px-4
            py-3

            text-sm
            font-medium

            text-red-600
            dark:text-red-400

            transition

            hover:bg-red-100/50
            dark:hover:bg-red-900/20
          "
        >
          Eliminar cuenta
        </button>
      </section>

      <DeleteAccountModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />
    </>
  );
}
