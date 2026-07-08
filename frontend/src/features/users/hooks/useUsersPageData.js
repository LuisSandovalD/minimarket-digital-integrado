// ========================================
// hooks/useUsersPageData.js
// ========================================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useBranches from "../../branches/hooks/useBranches";
import { deleteUser } from "../services/users.service";
import useUsers from "./useUsers";

export function useUsersPageData() {
    const queryClient = useQueryClient();

    // ========================================
    // CORE HOKS (Data fetching & state queries)
    // ========================================
    const { branches = [], loading: loadingBranches } = useBranches({
        page: 1,
        limit: 100,
    });

    const {
        users,
        allUsersRaw,
        pagination,
        filters,
        setFilters,
        loading: loadingUsers,
        expandedUsers,
        toggleExpand,
        toggleUserStatus,
        fetchUsers,
    } = useUsers();

    // ========================================
    // LOCAL STATES (Modals and action triggers)
    // ========================================
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userForAction, setUserForAction] = useState(null);
    const [openStatusAlert, setOpenStatusAlert] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    // ========================================
    // TRANSTACK MUTATIONS
    // ========================================
    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            await queryClient.invalidateQueries({ queryKey: ["users-hierarchy"] });
            fetchUsers?.();
        },
        onError: (err) => {
            console.error("ERROR AL ELIMINAR USUARIO:", err);
        },
    });

    // 🌟 Sincronización reactiva con los filtros del hook de usuarios
    useEffect(() => {
        if (fetchUsers) {
            fetchUsers();
        }
    }, [filters]);

    // ========================================
    // FILTERS & PAGINATION HANDLERS
    // ========================================
    const handleSearch = (newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            page: 1,
        }));
    };

    const handleClear = () => {
        setFilters({
            page: 1,
            limit: 10,
            search: undefined,
            branchId: undefined,
            isActive: undefined,
            sortBy: "createdAt",
            sortOrder: "desc",
        });
    };

    const handlePrevPage = () => {
        if (pagination?.hasPrevPage) {
            setFilters((prev) => ({ ...prev, page: (prev.page || 1) - 1 }));
        }
    };

    const handleNextPage = () => {
        if (pagination?.hasNextPage) {
            setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
        }
    };

    // ========================================
    // ACTION DISPATCHERS (CRUD Modals UI)
    // ========================================
    const handleCreate = () => {
        setSelectedUser(null);
        setOpenModal(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleToggleStatusTrigger = (user) => {
        setUserForAction(user);
        setOpenStatusAlert(true);
    };

    const handleDeleteTrigger = (user) => {
        setUserForAction(user);
        setOpenDeleteAlert(true);
    };

    const handleSuccess = () => {
        fetchUsers?.();
        setOpenModal(false);
    };

    return {
        // States & Data arrays
        branches,
        users,
        allUsersRaw,
        pagination,
        expandedUsers,
        loading: loadingUsers,
        loadingBranches,
        openModal,
        selectedUser,
        userForAction,
        openStatusAlert,
        openDeleteAlert,

        // Core Actions
        toggleExpand,
        toggleUserStatus,
        setOpenModal,
        setOpenStatusAlert,
        setOpenDeleteAlert,
        deleteMutation,

        // Handlers
        handleSearch,
        handleClear,
        handlePrevPage,
        handleNextPage,
        handleCreate,
        handleEdit,
        handleToggleStatusTrigger,
        handleDeleteTrigger,
        handleSuccess,
    };
}
