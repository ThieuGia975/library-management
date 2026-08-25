const express = require("express");

const dashboardController =
    require("../controllers/dashboard.controller");

const authenticate =
    require("../middleware/auth.middleware");

const authorize =
    require("../middleware/role.middleware");

const router = express.Router();

router.get(
    "/stats",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    dashboardController.getDashboardStats
);

module.exports = router;