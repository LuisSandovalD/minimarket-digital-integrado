const supplierService = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.createSupplier({
      ...req.body,
      companyId: req.user.companyId,
    });

    return res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.getSuppliers(
      req.user.companyId,
      req.query,
    );

    return res.status(200).json({
      success: true,
      ...suppliers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await supplierService.getSupplierById(
      id,
      req.user.companyId,
    );

    return res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierService.searchSuppliers(
      req.user.companyId,
      req.query.q,
    );

    return res.status(200).json({
      success: true,
      data: suppliers,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await supplierService.updateSupplier(
      req.params.id,
      req.user.companyId,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Supplier updated successfully",
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const response = await supplierService.deleteSupplier(
      req.params.id,
      req.user.companyId,
    );

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.restoreSupplier = async (req, res, next) => {
  try {
    const response = await supplierService.restoreSupplier(
      req.params.id,
      req.user.companyId,
    );

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
