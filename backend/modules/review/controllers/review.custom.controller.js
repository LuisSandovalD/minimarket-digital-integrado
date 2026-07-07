const service = require("../services/review.service");

exports.statistics = async (req, res) => {
    try {
        const statistics = await service.getStatistics(req.user.companyId);
        return res.status(200).json({ success: true, data: statistics });
    } catch (error) {
        console.error("❌ ReviewCustomController -> statistics:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPublicReviews = async (req, res) => {
    try {
        const reviews = await service.getPublicReviews();
        return res.status(200).json({ success: true, total: reviews.length, data: reviews });
    } catch (error) {
        console.error("❌ ReviewCustomController -> getPublicReviews:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLatestReviews = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const reviews = await service.getLatestReviews(limit);
        return res.status(200).json({ success: true, total: reviews.length, data: reviews });
    } catch (error) {
        console.error("❌ ReviewCustomController -> getLatestReviews:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.publicStatistics = async (req, res) => {
    try {
        const statistics = await service.getPublicStatistics();
        return res.status(200).json({ success: true, data: statistics });
    } catch (error) {
        console.error("❌ ReviewCustomController -> publicStatistics:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};