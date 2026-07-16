const service = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    // 1. Extraemos el companyId del usuario autenticado
    const { companyId } = req.user;

    // 2. Pasamos req.query (que contiene ?page=1&limit=10&search=...) al servicio
    const { data, pagination } = await service.getUsers(companyId, req.query);

    // 3. Respondemos con la data y la paginación de forma unificada
    res.json({
      success: true,
      data,
      pagination,
    });
  } catch (error) {
    console.error("GET USERS CONTROLLER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error al obtener la lista de usuarios",
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await service.getUserById(
      Number(req.params.id),
      req.user.companyId,
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await service.createUser(
      req.body,
      req.user.companyId,
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await service.updateUser(
      Number(req.params.id),
      req.user.companyId,
      req.body,
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await service.deleteUser(
      Number(req.params.id),
      req.user.companyId,
    );

    res.json({
      success: true,
      message: "Usuario eliminado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const restoreUser = async (req, res) => {
  try {
    await service.restoreUser(
      Number(req.params.id),
      req.user.companyId,
    );

    res.json({
      success: true,
      message: "Usuario restaurado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
};
