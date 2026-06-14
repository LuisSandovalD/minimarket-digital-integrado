const express =
    require("express");

const router =
    express.Router();

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

const analyticsController =
    require(
        "../controllers/analytics.controller"
    );

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

const auth =
    require(
        "../../../middleware/auth"
    );

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

router.get(

    "/",
    auth,

    analyticsController
        .getAnalytics
);

/*
|--------------------------------------------------------------------------
| Sales Analytics
|--------------------------------------------------------------------------
*/

router.get(

    "/sales",
    auth,

    analyticsController
        .getAnalytics
);

/*
|--------------------------------------------------------------------------
| Top Products
|--------------------------------------------------------------------------
*/

router.get(

    "/top-products",
    auth,

    analyticsController
        .getAnalytics
);

/*
|--------------------------------------------------------------------------
| Top Customers
|--------------------------------------------------------------------------
*/

router.get(

    "/top-customers",
    auth,

    analyticsController
        .getAnalytics
);

router.get(
    "/purchases",
    auth,
    analyticsController.getAnalytics
);

router.get(
    "/top-suppliers",
    auth,
    analyticsController.getAnalytics
);
module.exports =
    router;