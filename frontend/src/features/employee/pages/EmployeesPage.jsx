// ========================================
// features/employees/pages/EmployeesPage.jsx
// ========================================

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import employeeService
  from "../services/employee.service.js";

// ========================================
// PAGE
// ========================================

export default function EmployeesPage() {

  // ========================================
  // STATES
  // ========================================

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({

    id: null,

    name: "",

    email: "",

    password: "",

    phone: "",

    position: "",

    department: "",

    branchId: 1,

  });

  // ========================================
  // LOAD
  // ========================================

  useEffect(() => {

    fetchEmployees();

  }, []);

  async function fetchEmployees() {

    try {

      setLoading(true);

      const response =
        await employeeService.getAll();

      const data =
        response?.data?.data || [];

      setEmployees(data);

    } catch (error) {

      console.error(error);

      setEmployees([]);

    } finally {

      setLoading(false);

    }

  }

  // ========================================
  // FILTER
  // ========================================

  const filteredEmployees =
    useMemo(() => {

      return employees.filter(employee => {

        const text = `
          ${employee.name || ""}
          ${employee.email || ""}
          ${employee.phone || ""}
          ${employee.employeeProfile?.position || ""}
          ${employee.employeeProfile?.department || ""}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [employees, search]);

  // ========================================
  // RESET FORM
  // ========================================

  function resetForm() {

    setForm({

      id: null,

      name: "",

      email: "",

      password: "",

      phone: "",

      position: "",

      department: "",

      branchId: 1,

    });

  }

  // ========================================
  // OPEN CREATE
  // ========================================

  function openCreate() {

    resetForm();

    setModalOpen(true);

  }

  // ========================================
  // OPEN EDIT
  // ========================================

  function openEdit(employee) {

    setForm({

      id:
        employee.id,

      name:
        employee.name || "",

      email:
        employee.email || "",

      password: "",

      phone:
        employee.phone || "",

      position:
        employee.employeeProfile?.position || "",

      department:
        employee.employeeProfile?.department || "",

      branchId:
        employee.branch?.id || 1,

    });

    setModalOpen(true);

  }

  // ========================================
  // SAVE
  // ========================================

  async function handleSave() {

    try {

      setSaving(true);

      const payload = {

        name:
          form.name,

        email:
          form.email,

        phone:
          form.phone,

        position:
          form.position,

        department:
          form.department,

        branchId:
          Number(form.branchId),

      };

      if (form.password) {

        payload.password =
          form.password;

      }

      if (form.id) {

        await employeeService.update(
          form.id,
          payload
        );

      } else {

        await employeeService.create(
          payload
        );

      }

      setModalOpen(false);

      resetForm();

      fetchEmployees();

    } catch (error) {

      console.error(error);

      alert("Ocurrió un error");

    } finally {

      setSaving(false);

    }

  }

  // ========================================
  // DELETE
  // ========================================

  async function handleDelete(id) {

    const confirmed =
      confirm(
        "¿Eliminar empleado?"
      );

    if (!confirmed) return;

    try {

      await employeeService.remove(id);

      fetchEmployees();

    } catch (error) {

      console.error(error);

      alert(
        "No se pudo eliminar"
      );

    }

  }

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <div className="p-6">
        Cargando empleados...
      </div>
    );

  }

  // ========================================
  // RENDER
  // ========================================

  return (

    <div className="p-6 space-y-5">

      {/* HEADER */}
      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="
            text-2xl
            font-bold
          ">
            Empleados
          </h1>

          <p className="
            text-sm
            text-gray-500
          ">
            Gestión de empleados
          </p>

        </div>

        <button
          onClick={openCreate}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-lg
          "
        >

          <Plus size={16} />

          Nuevo

        </button>

      </div>

      {/* SEARCH */}
      <div className="relative">

        <Search className="
          absolute
          left-3
          top-3
          w-4
          h-4
          text-gray-400
        " />

        <input
          type="text"
          placeholder="Buscar empleado..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            border
            rounded-lg
            pl-10
            pr-4
            py-2
          "
        />

      </div>

      {/* TABLE */}
      <div className="
        bg-white
        border
        rounded-xl
        overflow-hidden
      ">

        <table className="w-full text-sm">

          <thead className="
            bg-gray-100
            text-left
          ">

            <tr>

              <th className="p-3">
                Nombre
              </th>

              <th className="p-3">
                Cargo
              </th>

              <th className="p-3">
                Departamento
              </th>

              <th className="p-3">
                Teléfono
              </th>

              <th className="p-3">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEmployees.map(employee => (

              <tr
                key={employee.id}
                className="border-t"
              >

                <td className="p-3">

                  <div className="font-medium">
                    {employee.name}
                  </div>

                  <div className="
                    text-xs
                    text-gray-500
                  ">
                    {employee.email}
                  </div>

                </td>

                <td className="p-3">

                  {employee.employeeProfile?.position || "-"}

                </td>

                <td className="p-3">

                  {employee.employeeProfile?.department || "-"}

                </td>

                <td className="p-3">

                  {employee.phone || "-"}

                </td>

                <td className="
                  p-3
                  flex
                  gap-2
                ">

                  <button
                    onClick={() =>
                      openEdit(employee)
                    }
                    className="
                      text-blue-600
                    "
                  >

                    <Pencil size={16} />

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(employee.id)
                    }
                    className="
                      text-red-600
                    "
                  >

                    <Trash2 size={16} />

                  </button>

                </td>

              </tr>

            ))}

            {filteredEmployees.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="
                    p-6
                    text-center
                    text-gray-500
                  "
                >

                  No hay empleados

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {modalOpen && (

        <div className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
        ">

          <div className="
            bg-white
            w-full
            max-w-md
            rounded-xl
            p-5
            space-y-4
          ">

            <h2 className="
              text-lg
              font-bold
            ">

              {form.id
                ? "Editar empleado"
                : "Nuevo empleado"}

            </h2>

            <input
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-lg
                p-2
              "
            />

            <input
              type="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-lg
                p-2
              "
            />

            {!form.id && (

              <input
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              />

            )}

            <input
              type="text"
              placeholder="Teléfono"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-lg
                p-2
              "
            />

            <input
              type="text"
              placeholder="Cargo"
              value={form.position}
              onChange={(e) =>
                setForm({
                  ...form,
                  position: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-lg
                p-2
              "
            />

            <input
              type="text"
              placeholder="Departamento"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-lg
                p-2
              "
            />

            <div className="
              flex
              justify-end
              gap-2
            ">

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="
                  border
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >

                {saving
                  ? "Guardando..."
                  : "Guardar"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}