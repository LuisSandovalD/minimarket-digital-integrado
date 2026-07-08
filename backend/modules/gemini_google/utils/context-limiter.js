// ========================================
// utils/context-limiter.js
// ========================================

const limitArray = (
    data,
    limit = 20
) => {

    if (!Array.isArray(data)) {
        return [];
    }

    return data.slice(
        0,
        limit
    );
};

const reduceContext = (
    context
) => {

    return {

        ...context,

        topProducts:
            limitArray(
                context.topProducts,
                15
            ),

        lowStockProducts:
            limitArray(
                context.lowStockProducts,
                15
            ),

        lowRotationProducts:
            limitArray(
                context.lowRotationProducts,
                15
            ),

        topEmployees:
            limitArray(
                context.topEmployees,
                10
            ),

        topSuppliers:
            limitArray(
                context.topSuppliers,
                10
            ),

        recentActivity:
            limitArray(
                context.recentActivity,
                20
            )
    };
};

module.exports = {
    reduceContext
};