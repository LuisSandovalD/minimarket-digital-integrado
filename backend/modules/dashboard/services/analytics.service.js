const salesRepository = require(
    "../repositories/sales.repository"
);

const customerRepository = require(
    "../repositories/customer.repository"
);

const purchaseRepository = require(
    "../repositories/purchase.repository"
);

exports.getAnalytics = async (
    companyId,
    dateFilter
) => {
    const [
        topProducts,
        topCustomers,
        recentSales,

        recentPurchases,
        purchasesChart,
        topSuppliers,
    ] = await Promise.all([
        salesRepository.getTopProducts(
            companyId,
            dateFilter
        ),

        customerRepository.getTopCustomers(
            companyId,
            dateFilter
        ),

        salesRepository.getRecentSales(
            companyId
        ),

        purchaseRepository.getRecentPurchases(
            companyId
        ),

        purchaseRepository.getPurchasesChart(
            companyId,
            dateFilter
        ),

        purchaseRepository.getTopSuppliers(
            companyId,
            dateFilter
        ),
    ]);

    return {
        topProducts,
        topCustomers,
        recentSales,

        recentPurchases,
        purchasesChart,
        topSuppliers,
    };
};