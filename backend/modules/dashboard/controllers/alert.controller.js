const alertService =
    require("../services/alert.service");

exports.getAlerts =
    async (req, res, next) => {

        try {

            const companyId =
                req.user.companyId;

            const alerts =
                await alertService
                    .getAlerts(
                        companyId
                    );

            return res.status(200)
                .json({
                    success: true,
                    data: alerts
                });

        } catch (error) {
            next(error);
        }

    };