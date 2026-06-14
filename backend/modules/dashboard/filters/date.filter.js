const buildDateFilter = ({
    period,
    startDate,
    endDate
}) => {

    const now = new Date();

    switch (period) {

        case "TODAY":
            return {
                gte: new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                )
            };

        case "LAST_7_DAYS":
            return {
                gte: new Date(
                    now.getTime() -
                    (7 * 24 * 60 * 60 * 1000)
                )
            };

        case "LAST_30_DAYS":
            return {
                gte: new Date(
                    now.getTime() -
                    (30 * 24 * 60 * 60 * 1000)
                )
            };

        case "LAST_MONTH":

            return {
                gte: new Date(
                    now.getFullYear(),
                    now.getMonth() - 1,
                    1
                ),

                lte: new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0,
                    23,
                    59,
                    59
                )
            };

        case "THIS_YEAR":

            return {
                gte: new Date(
                    now.getFullYear(),
                    0,
                    1
                )
            };

        case "LAST_YEAR":

            return {
                gte: new Date(
                    now.getFullYear() - 1,
                    0,
                    1
                ),

                lte: new Date(
                    now.getFullYear() - 1,
                    11,
                    31,
                    23,
                    59,
                    59
                )
            };

        default:

            if (startDate && endDate) {

                return {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                };

            }

            return {};
    }

};

module.exports = {
    buildDateFilter
};