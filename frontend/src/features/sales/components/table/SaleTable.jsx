// ========================================
// SALE TABLE (CORE POS VIEW)
// ========================================

import React from "react";

import { SaleStatusBadge } from "../ui/SaleStatusBadge";

// ========================================
// TABLE
// ========================================

export const SaleTable = ({
  sales = [],
  loading,
  onView,
  onPay,
  onCancel,
  onReturn,
}) => {
  if (loading) return <p>Cargando...</p>;

  return (
    <div>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {sales.map((sale) => (
            <tr key={sale.id}>

              {/* ID */}
              <td>#{sale.id}</td>

              {/* CLIENTE */}
              <td>
                {sale.customerName || "Sin cliente"}
              </td>

              {/* TOTAL */}
              <td>
                {sale.total}
              </td>

              {/* STATUS */}
              <td>
                <SaleStatusBadge
                  status={sale.status}
                />
              </td>

              {/* DATE */}
              <td>
                {new Date(
                  sale.createdAt
                ).toLocaleDateString()}
              </td>

              {/* ACTIONS */}
              <td>

                <button
                  onClick={() => onView(sale)}
                >
                  Ver
                </button>

                <button
                  onClick={() => onPay(sale)}
                >
                  Pagar
                </button>

                <button
                  onClick={() => onCancel(sale)}
                >
                  Cancelar
                </button>

                <button
                  onClick={() => onReturn(sale)}
                >
                  Devolución
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};