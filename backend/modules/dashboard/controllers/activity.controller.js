const activityService =
    require("../services/activity.service");

exports.getActivity =
    async (req, res, next) => {

        try {

            const companyId =
                req.user.companyId;

            const activity =
                await activityService
                    .getActivity(
                        companyId
                    );

            return res.status(200)
                .json({
                    success: true,
                    data: activity
                });

        } catch (error) {
            next(error);
        }

    };