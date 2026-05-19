// ========================================
// features/customers/pages/CustomerPage.jsx
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

import customerService
  from "../services/customer.service.js";

// ========================================
// PAGE
// ========================================

export default function CustomerPage() {

  // ========================================
  // STATES
  // ========================================

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [form, setForm] = useState({

    id: null,

    name: "",

    documentType: "",

    documentNumber: "",

    email: "",

    phone: "",

    address: "",

    city: "",

    notes: "",

    creditLimit: "",

  });

  // ========================================
  // LOAD
  // ========================================

  useEffect(() => {

    fetchCustomers();

  }, []);

  async function fetchCustomers() {

    try {

      setLoading(true);

      const response =
        await customerService.getAll();

      setCustomers(
        response?.data?.data || []
      );

    } catch (error) {

      console.error(error);

      setCustomers([]);

    } finally {

      setLoading(false);

    }

  }

  // ========================================
  // FILTER
  // ========================================

  const filteredCustomers =
    useMemo(() => {

      return customers.filter(customer => {

        const text = `
          ${customer.name || ""}
          ${customer.email || ""}
          ${customer.phone || ""}
          ${customer.documentNumber || ""}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [customers, search]);

  // ========================================
  // RESET FORM
  // ========================================

  function resetForm() {

    setForm({

      id: null,

      name: "",

      documentType: "",

      documentNumber: "",

      email: "",

      phone: "",

      address: "",

      city: "",

      notes: "",

      creditLimit: "",

    });

  }

  // ========================================
  // CREATE
  // ========================================

  function openCreate() {

    resetForm();

    setModalOpen(true);

  }

  // ========================================
  // EDIT
  // ========================================

  function openEdit(customer) {

    setForm({

      id:
        customer.id,

      name:
        customer.name || "",

      documentType:
        customer.documentType || "",

      documentNumber:
        customer.documentNumber || "",

      email:
        customer.email || "",

      phone:
        customer.phone || "",

      address:
        customer.address || "",

      city:
        customer.city || "",

      notes:
        customer.notes || "",

      creditLimit:
        customer.creditLimit || "",

    });

    setModalOpen(true);

  }

  // ========================================
  // SAVE
  // ========================================

  async function handleSave() {

    try {

      if (!form.name) {

        alert(
          "El nombre es obligatorio"
        );

        return;

      }

      setSaving(true);

      const payload = {

        name:
          form.name,

        documentType:
          form.documentType || null,

        documentNumber:
          form.documentNumber || null,

        email:
          form.email || null,

        phone:
          form.phone || null,

        address:
          form.address || null,

        city:
          form.city || null,

        notes:
          form.notes || null,

        creditLimit:
          form.creditLimit
            ? Number(form.creditLimit)
            : null,

      };

      if (form.id) {

        await customerService.update(
          form.id,
          payload
        );

      } else {

        await customerService.create(
          payload
        );

      }

      setModalOpen(false);

      resetForm();

      fetchCustomers();

    } catch (error) {

      console.error(error);

      alert(
        "Ocurrió un error"
      );

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
        "¿Eliminar cliente?"
      );

    if (!confirmed) return;

    try {

      await customerService.remove(id);

      fetchCustomers();

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
        Cargando clientes...
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
            Clientes
          </h1>

          <p className="
            text-sm
            text-gray-500
          ">
            Gestión de clientes
          </p>

        </div>

        <button
          onClick={openCreate}
          className="
            flex
            items-center
            gap-2
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >

          <Plus size={18} />

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
          placeholder="Buscar cliente..."
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
        border
        rounded-xl
        overflow-hidden
      ">

        <table className="w-full">

          <thead className="
            bg-gray-100
            text-left
          ">

            <tr>

              <th className="p-3">
                Nombre
              </th>

              <th className="p-3">
                Documento
              </th>

              <th className="p-3">
                Email
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

            {filteredCustomers.map(customer => (

              <tr
                key={customer.id}
                className="border-t"
              >

                <td className="p-3">
                  {customer.name}
                </td>

                <td className="p-3">

                  {customer.documentType}
                  {" "}
                  {customer.documentNumber}

                </td>

                <td className="p-3">
                  {customer.email || "-"}
                </td>

                <td className="p-3">
                  {customer.phone || "-"}
                </td>

                <td className="
                  p-3
                  flex
                  gap-2
                ">

                  <button
                    onClick={() =>
                      openEdit(customer)
                    }
                    className="text-blue-600"
                  >

                    <Pencil size={16} />

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(customer.id)
                    }
                    className="text-red-600"
                  >

                    <Trash2 size={16} />

                  </button>

                </td>

              </tr>

            ))}

            {filteredCustomers.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="
                    p-6
                    text-center
                    text-gray-500
                  "
                >

                  No hay clientes

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
            max-w-xl
            rounded-xl
            p-5
            space-y-4
          ">

            <h2 className="
              text-xl
              font-bold
            ">

              {form.id
                ? "Editar cliente"
                : "Nuevo cliente"}

            </h2>

            <div className="
              grid
              grid-cols-2
              gap-3
            ">

              <input
                placeholder="Nombre"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                "
              />

              <input
                placeholder="Tipo documento"
                value={form.documentType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    documentType:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                "
              />

              <input
                placeholder="N° documento"
                value={form.documentNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    documentNumber:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                "
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                "
              />

              <input
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                "
              />

              <input
                placeholder="Ciudad"
                value={form.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    city:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                "
              />

              <input
                placeholder="Dirección"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                  col-span-2
                "
              />

              <textarea
                placeholder="Notas"
                value={form.notes}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes:
                      e.target.value,
                  })
                }
                className="
                  border
                  rounded-lg
                  p-2
                  col-span-2
                "
              />

            </div>

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