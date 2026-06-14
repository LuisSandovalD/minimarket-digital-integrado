const dashboardService =
    require("../services/dashboard.service");

const {
    dashboardFilter
} = require("../filters/dashboard.filter");

exports.getDashboard =
    async (req, res, next) => {

        try {

            const companyId =
                req.user.companyId;

            const dateFilter =
                dashboardFilter(
                    req.query
                );

            const dashboard =
                await dashboardService
                    .getDashboard(
                        companyId,
                        dateFilter
                    );

            return res.status(200)
                .json({
                    success: true,
                    data: dashboard
                });

        } catch (error) {
            next(error);
        }

    };