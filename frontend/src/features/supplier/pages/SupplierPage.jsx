// ========================================
// features/supplier/pages/SupplierPage.jsx
// ========================================

import { useState } from 'react'

import SupplierHeader
  from '../components/SupplierHeader'

import SupplierFormModal
  from '../components/SupplierFormModal'

import SupplierTable
  from '../components/SupplierTable'

import SupplierFilters
  from '../components/SupplierFilters'

import useSupplier
  from '../hooks/useSuppliers'

import useSupplierFilters
  from '../hooks/useSupplierFilters'

export default function SupplierPage() {

  const {

    suppliers,
    loading,
    saving,

    form,
    editingId,

    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm

  } = useSupplier()

  // ========================================
  // FILTERS
  // ========================================

  const {

    search,
    setSearch,

    filteredSuppliers,

  } = useSupplierFilters(
    suppliers
  )

  // ========================================
  // MODAL
  // ========================================

  const [openModal, setOpenModal] =
    useState(false)

  // ========================================
  // OPEN CREATE
  // ========================================

  const handleOpenCreate = () => {

    resetForm()

    setOpenModal(true)

  }

  // ========================================
  // OPEN EDIT
  // ========================================

  const handleOpenEdit = (
    supplier
  ) => {

    handleEdit(supplier)

    setOpenModal(true)

  }

  // ========================================
  // CLOSE MODAL
  // ========================================

  const handleCloseModal = () => {

    resetForm()

    setOpenModal(false)

  }

  // ========================================
  // SUBMIT
  // ========================================

  const handleSaveSupplier =
    async () => {

      const success =
        await handleSubmit()

      if (success) {

        setOpenModal(false)

      }

    }

  // ========================================
  // STATS
  // ========================================

  const total =
    suppliers.length

  const active =
    suppliers.filter(
      (supplier) =>
        supplier.isActive
    ).length

  const inactive =
    suppliers.filter(
      (supplier) =>
        !supplier.isActive
    ).length

  return (

    <div
      className="
        space-y-6
        p-6
      "
    >

      {/* ========================================
       * HEADER
       * ====================================== */}

      <SupplierHeader

        total={total}

        active={active}

        inactive={inactive}

        onCreate={
          handleOpenCreate
        }

      />

      {/* ========================================
       * FILTERS
       * ====================================== */}

      <SupplierFilters

        search={search}

        setSearch={setSearch}

      />

      {/* ========================================
       * TABLE
       * ====================================== */}

      <SupplierTable

        suppliers={
          filteredSuppliers
        }

        loading={loading}

        handleEdit={
          handleOpenEdit
        }

        handleDelete={
          handleDelete
        }

      />

      {/* ========================================
       * MODAL
       * ====================================== */}

      <SupplierFormModal

        open={openModal}

        onClose={
          handleCloseModal
        }

        onSubmit={
          handleSaveSupplier
        }

        form={form}

        onChange={
          handleChange
        }

        loading={saving}

        isEdit={
          !!editingId
        }

      />

    </div>

  )

}