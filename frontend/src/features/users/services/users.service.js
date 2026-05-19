// ========================================
// services/users.service.js
// ========================================

import api
  from "../../../api/axios";

// ========================================
// GET ALL USERS
// ========================================

export async function getUsers() {

  const response =
    await api.get("/user");

  return response.data;

}

// ========================================
// GET HIERARCHY
// ========================================

export async function getRootUsers() {

  const response =
    await api.get(
      "/user/hierarchy"
    );

  return response.data;

}

// ========================================
// GET USERS BY MANAGER
// OPTIONAL
// If backend endpoint exists
// ========================================

export async function getUsersByManager(
  managerId
) {

  const response =
    await api.get(
      `/user/${managerId}`
    );

  return response.data;

}

// ========================================
// GET USER BY ID
// ========================================

export async function getUserById(
  id
) {

  const response =
    await api.get(
      `/user/${id}`
    );

  return response.data;

}

// ========================================
// CREATE USER
// ========================================

export async function createUser(
  data
) {

  const response =
    await api.post(
      "/user",
      data
    );

  return response.data;

}

// ========================================
// UPDATE USER
// ========================================

export async function updateUser(
  id,
  data
) {

  const response =
    await api.put(
      `/user/${id}`,
      data
    );

  return response.data;

}

// ========================================
// TOGGLE USER STATUS
// ========================================

export async function toggleUserStatus(
  id
) {

  const response =
    await api.patch(
      `/user/${id}/status`
    );

  return response.data;

}

// ========================================
// DELETE USER
// ========================================

export async function deleteUser(
  id
) {

  const response =
    await api.delete(
      `/user/${id}`
    );

  return response.data;

}

// ========================================
// RESTORE USER
// ========================================

export async function restoreUser(
  id
) {

  const response =
    await api.patch(
      `/user/restore/${id}`
    );

  return response.data;

}