import { Search } from "lucide-react";
import TicketItem from "./TicketItem";

export default function SupportSidebar({
  tickets = [],
  filteredTickets = [],
  loading,
  selectedTicket,
  onSelectTicket,
  search,
}) {
  const totalOpen = tickets.filter((t) => t.status === "OPEN").length;
  const totalInProgress = tickets.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const totalResolved = tickets.filter((t) => t.status === "RESOLVED").length;

  return (
    <div className="flex w-full flex-col gap-6">
      {/* =========================
          HEADER STATS
      ========================= */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800/60 pb-5 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Listado de Solicitudes
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            Mostrando{" "}
            <span className="font-medium text-blue-400">
              {filteredTickets.length}
            </span>{" "}
            resultados de {tickets.length}
          </p>
        </div>

        {tickets.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            <Stat label="Abiertos" value={totalOpen} color="blue" />
            <Stat label="En progreso" value={totalInProgress} color="amber" />
            <Stat label="Cerrados" value={totalResolved} color="emerald" />
          </div>
        )}
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="flex-1">
        {/* =========================
            LOADING (SKELETON PRO)
        ========================= */}
        {loading && <SidebarSkeleton />}

        {/* =========================
            EMPTY STATE
        ========================= */}
        {!loading && filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center animate-in fade-in duration-300">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-400">
              <Search size={22} />
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-slate-200">
                {search ? "Sin coincidencias" : "Sin tickets"}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed">
                {search
                  ? `No hay resultados para "${search}".`
                  : "Aún no tienes tickets registrados."}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            LIST
        ========================= */}
        {!loading && filteredTickets.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                active={selectedTicket?.id === ticket.id}
                onClick={() => onSelectTicket(ticket)}
              />
            ))}
          </div>
        )}
      </div>

      {/* =========================
          FOOTER
      ========================= */}
      {filteredTickets.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-800/40 pt-4">
          <span className="text-xs text-slate-500">Fin de la lista</span>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   SUBCOMPONENT: STAT BADGE
===================================================== */
function Stat({ label, value, color }) {
  const colors = {
    blue: "border-blue-500/10 bg-blue-500/5 text-blue-400",
    amber: "border-amber-500/10 bg-amber-500/5 text-amber-400",
    emerald: "border-emerald-500/10 bg-emerald-500/5 text-emerald-400",
  };

  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium ${colors[color]}`}
    >
      <span>{label}:</span>
      <strong className="text-white">{value}</strong>
    </div>
  );
}

/* =====================================================
   SKELETON LOADING
===================================================== */
function SidebarSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-24 rounded-xl border border-slate-800/50 bg-slate-900/40"
        />
      ))}
    </div>
  );
}
