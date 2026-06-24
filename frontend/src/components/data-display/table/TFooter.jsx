// ============================================
// components/ui/table/TFooter.jsx
// ============================================

import { ChevronLeft, ChevronRight } from "lucide-react";
export default function TFooter({
  page = 1,
  totalPages = 1,
  onPrev = () => {},
  onNext = () => {},
}) {
  // Aseguramos que si no hay páginas, el total visual sea al menos 1
  const displayTotalPages = totalPages < 1 ? 1 : totalPages;

  return (
    <tfoot>
      <tr>
        <td colSpan="999" className="border-t border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between px-6 py-4">
            <p className="text-sm text-white/40">
              Página {page} de {displayTotalPages}
            </p>

            <div className="flex items-center gap-2">
              {/* PREV */}
              <button
                onClick={onPrev}
                disabled={page <= 1} // 👈 Cambiado a '<=' por seguridad
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:bg-white/[0.08] disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>

              {/* NEXT */}
              <button
                onClick={onNext}
                disabled={page >= displayTotalPages} // 👈 Cambiado a '>=' por seguridad
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:bg-white/[0.08] disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}
