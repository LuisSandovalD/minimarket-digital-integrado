// ========================================
// features/employees/components/EmployeesTable.jsx
// ========================================

import {
  BadgeCheck,
  Briefcase,
  Building2,
  Mail,
  Settings2,
  User,
  Users,
} from "lucide-react";

import { Table, THead } from "@/components/data-display";

import EmployeeActions from "./EmployeeActions.jsx";

export default function EmployeesTable({ employees = [], onEdit, onDelete }) {
  const columns = [
    {
      key: "employee",
      label: (
        <div className="flex items-center gap-2">
          <User size={14} />
          Empleado
        </div>
      ),
    },

    {
      key: "contact",
      label: (
        <div className="flex items-center gap-2">
          <Mail size={14} />
          Contacto
        </div>
      ),
    },

    {
      key: "position",
      label: (
        <div className="flex items-center gap-2">
          <Briefcase size={14} />
          Cargo
        </div>
      ),
    },

    {
      key: "department",
      label: (
        <div className="flex items-center gap-2">
          <Building2 size={14} />
          Departamento
        </div>
      ),
    },

    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <BadgeCheck size={14} />
          Estado
        </div>
      ),
    },

    {
      key: "actions",
      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* HEADER */}

      <div>
        <h2
          className="
            text-xl
            font-semibold
            tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          Empleados
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Gestiona el personal de tu empresa.
        </p>
      </div>

      {/* TABLE */}

      <Table>
        <THead columns={columns} />

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr
                key={employee.id}
                className="
                  border-b
                  border-slate-200/50
                  dark:border-slate-800
                  transition-all
                  hover:bg-slate-50
                  dark:hover:bg-slate-900/40
                "
              >
                {/* EMPLEADO */}

                <td className="px-6 py-5">
                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {employee.name}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      {employee.role}
                    </p>
                  </div>
                </td>

                {/* CONTACTO */}

                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <p
                      className="
                        text-sm
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      {employee.email}
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {employee.phone || "Sin teléfono"}
                    </p>
                  </div>
                </td>

                {/* CARGO */}

                <td className="px-6 py-5">
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-xl
                      border
                      border-slate-200
                      dark:border-slate-700
                      px-3
                      py-1
                      text-xs
                      font-medium
                    "
                  >
                    {employee.employeeProfile?.position || "-"}
                  </span>
                </td>

                {/* DEPARTAMENTO */}

                <td className="px-6 py-5">
                  <div>
                    <p
                      className="
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      {employee.employeeProfile?.department || "-"}
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {employee.employeeProfile?.shift || "Sin turno"}
                    </p>
                  </div>
                </td>

                {/* ESTADO */}

                <td className="px-6 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${
                        employee.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }
                    `}
                  >
                    {employee.isActive ? "Activo" : "Inactivo"}
                  </span>
                </td>

                {/* ACCIONES */}

                <td className="px-6 py-5">
                  <EmployeeActions
                    employee={employee}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="
                  px-6
                  py-16
                  text-center
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      mb-4
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-100
                      dark:bg-slate-800
                    "
                  >
                    <Users
                      className="
                        h-8
                        w-8
                        text-slate-400
                      "
                    />
                  </div>

                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-slate-700
                      dark:text-slate-200
                    "
                  >
                    No hay empleados
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    Empieza registrando tu primer empleado.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
