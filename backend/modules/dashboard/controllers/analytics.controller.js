const analyticsService =
    require("../services/analytics.service");

const {
    dashboardFilter
} = require("../filters/dashboard.filter");

exports.getAnalytics =
    async (req, res, next) => {

        try {

            const companyId =
                req.user.companyId;

            const dateFilter =
                dashboardFilter(
                    req.query
                );

            const analytics =
                await analyticsService
                    .getAnalytics(
                        companyId,
                        dateFilter
                    );

            return res.status(200)
                .json({
                    success: true,
                    data: analytics
                });

        } catch (error) {
            next(error);
        }

    };