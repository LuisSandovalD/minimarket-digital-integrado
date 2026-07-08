const branchService = require("../services/branch.service");
const cloudinary = require("../../../config/cloudinary");
const { successResponse, errorResponse } = require("../../auth/responses/auth.response");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "branches_logos" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

exports.getBranches = async (req, res) => {
    try {
        const { companyId } = req.user;
        const { search, city, country, isActive, page, limit } = req.query;

        const options = {
            search,
            city,
            country,
            isActive: isActive !== undefined ? isActive === "true" : undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        };

        const data = await branchService.getBranches(companyId, options);
        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, error);
    }
};

exports.getBranchById = async (req, res) => {
    try {
        const branchId = Number(req.params.id);

        if (Number.isNaN(branchId)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        const data = await branchService.getBranchById(branchId, req.user.companyId);
        return successResponse(res, data);
    } catch (error) {
        if (error.message === "Sucursal no encontrada") {
            return res.status(404).json({ success: false, message: error.message });
        }
        return errorResponse(res, error);
    }
};

exports.createBranch = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            data.logo = await uploadToCloudinary(req.file.buffer);
        } else {
            data.logo = null;
        }

        const branch = await branchService.createBranch(data, req.user.companyId);
        return successResponse(res, branch, 201);
    } catch (error) {
        return errorResponse(res, error);
    }
};

exports.updateBranch = async (req, res) => {
    try {
        const branchId = Number(req.params.id);

        if (Number.isNaN(branchId)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        const data = { ...req.body };

        if (req.file) {
            data.logo = await uploadToCloudinary(req.file.buffer);
        }

        const branch = await branchService.updateBranch(branchId, data, req.user.companyId);
        return successResponse(res, branch);
    } catch (error) {
        if (error.message === "Sucursal no encontrada") {
            return res.status(404).json({ success: false, message: error.message });
        }
        return errorResponse(res, error);
    }
};

exports.deleteBranch = async (req, res) => {
    try {
        const branchId = Number(req.params.id);

        if (Number.isNaN(branchId)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        await branchService.deleteBranch(branchId, req.user.companyId);
        return successResponse(res, { message: "Sucursal eliminada correctamente" });
    } catch (error) {
        if (error.message === "Sucursal no encontrada") {
            return res.status(404).json({ success: false, message: error.message });
        }
        return errorResponse(res, error);
    }
};