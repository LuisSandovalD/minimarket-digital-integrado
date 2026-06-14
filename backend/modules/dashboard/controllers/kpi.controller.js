const kpiService =
    require("../services/kpi.service");

const {
    dashboardFilter
} = require("../filters/dashboard.filter");

exports.getKPIs =
    async (req, res, next) => {

        try {

            const companyId =
                req.user.companyId;

            const dateFilter =
                dashboardFilter(
                    req.query
                );

            const data =
                await kpiService.getKPIs(
                    companyId,
                    dateFilter
                );

            return res.status(200)
                .json({
                    success: true,
                    data
                });

        } catch (error) {
            next(error);
        }

    };