const {
    buildDateFilter
} = require("./date.filter");

exports.dashboardFilter = (
    query
) => {

    const {
        period,
        startDate,
        endDate
    } = query;

    return buildDateFilter({
        period,
        startDate,
        endDate
    });

};