// ========================================
// components/users/UsersEmpty.jsx
// ========================================

import { Users } from "lucide-react";

export default function UsersEmpty() {
  // Encabezados idénticos a los de tu tabla para mantener la estructura visual uniforme
  const headers = [
    "Usuario",
    "Contacto",
    "Rol",
    "Sucursal",
    "Estado",
    "Último acceso",
    "Creado",
    "",
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:bg-white/[0.03]">
      {/* Glow de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02]" />

      <div className="overflow-x-auto">
        <table className="w-full">
          {/* ENCABEZADOS DE LA TABLA */}
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {headers.map((item, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-white/40"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          {/* CUERPO DEL CONTENIDO VACÍO */}
          <tbody>
            <tr>
              <td colSpan={headers.length} className="px-6 py-16 text-center">
                <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto">
                  {/* ICONO CON EFECTO DE GLOW */}
                  <div
                    className="
                      mb-5
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      text-slate-400
                      dark:text-white/60
                      shadow-[0_4px_20px_rgba(255,255,255,0.05)]
                    "
                  >
                    <Users size={28} />
                  </div>

                  {/* TÍTULO */}
                  <h3 className="text-base font-semibold tracking-tight text-slate-800 dark:text-white">
                    No hay usuarios
                  </h3>

                  {/* DESCRIPCIÓN */}
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Actualmente no existen usuarios registrados en este nivel
                    jerárquico o con los filtros seleccionados.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
