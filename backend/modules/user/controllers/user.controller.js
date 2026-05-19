// ========================================
// controllers/user.controller.js
// ========================================

const service =
  require("../services/user.service");

// ========================================
// GET ALL USERS
// ========================================

exports.getUsers =
  async (req, res) => {

    try {

      const users =
        await service.getUsers(
          req.user.companyId
        );

      res.json({
        success: true,
        data: users,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ========================================
// GET USER BY ID
// ========================================

exports.getUserById =
  async (req, res) => {

    try {

      const user =
        await service.getUserById(
          parseInt(req.params.id),
          req.user.companyId
        );

      if (!user) {

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Usuario no encontrado",
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
        message:
          error.message,
      });

    }

  };

// ========================================
// GET USER HIERARCHY
// ========================================

exports.getHierarchy =
  async (req, res) => {

    try {

      const hierarchy =
        await service.getHierarchy(
          req.user.companyId
        );

      res.json({
        success: true,
        data: hierarchy,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ========================================
// CREATE USER
// ========================================

exports.createUser =
  async (req, res) => {

    try {

      const user =
        await service.createUser(
          req.body,
          req.user.companyId
        );

      res.status(201).json({
        success: true,
        data: user,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ========================================
// UPDATE USER
// ========================================

exports.updateUser =
  async (req, res) => {

    try {

      const updatedUser =
        await service.updateUser(
          parseInt(req.params.id),
          req.user.companyId,
          req.body
        );

      res.json({
        success: true,
        data: updatedUser,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ========================================
// TOGGLE USER STATUS
// ========================================

exports.toggleUserStatus =
  async (req, res) => {

    try {

      const result =
        await service.toggleUserStatus(
          parseInt(req.params.id),
          req.user.companyId
        );

      res.json({
        success: true,
        data: result,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ========================================
// DELETE USER
// ========================================

exports.deleteUser =
  async (req, res) => {

    try {

      await service.deleteUser(
        parseInt(req.params.id),
        req.user.companyId
      );

      res.json({
        success: true,
        message:
          "Usuario eliminado",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// ========================================
// RESTORE USER
// ========================================

exports.restoreUser =
  async (req, res) => {

    try {

      await service.restoreUser(
        parseInt(req.params.id),
        req.user.companyId
      );

      res.json({
        success: true,
        message:
          "Usuario restaurado",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };