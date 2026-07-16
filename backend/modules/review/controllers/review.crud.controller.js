const service = require("../services/review.service");
const { createSchema, updateSchema } = require("../validations/review.validation");

exports.create = async (req, res) => {
  try {
    const { error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const review = await service.createReview(req.user.id, req.user.companyId, req.body);
    return res.status(201).json({ success: true, message: "Reseña registrada correctamente.", data: review });
  } catch (error) {
    console.error("❌ ReviewCrudController -> create:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyReview = async (req, res) => {
  try {
    const review = await service.getMyReview(req.user.id, req.user.companyId);
    return res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error("❌ ReviewCrudController -> getMyReview:", error);
    return res.status(404).json({ success: false, message: error.message });
  }
};

exports.updateMyReview = async (req, res) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const review = await service.updateMyReview(req.user.id, req.user.companyId, req.body);
    return res.status(200).json({ success: true, message: "Reseña actualizada correctamente.", data: review });
  } catch (error) {
    console.error("❌ ReviewCrudController -> updateMyReview:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteMyReview = async (req, res) => {
  try {
    const response = await service.deleteMyReview(req.user.id, req.user.companyId);
    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ ReviewCrudController -> deleteMyReview:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const reviews = await service.getReviews(req.user.companyId);
    return res.status(200).json({ success: true, total: reviews.length, data: reviews });
  } catch (error) {
    console.error("❌ ReviewCrudController -> getAll:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const review = await service.getReview(req.params.id, req.user.companyId);
    return res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error("❌ ReviewCrudController -> getById:", error);
    return res.status(404).json({ success: false, message: error.message });
  }
};
