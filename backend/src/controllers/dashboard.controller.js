const dashboardService =
    require("../services/dashboard.service");


const getDashboardStats = async (
    req,
    res
) => {

    try {

        const stats =
            await dashboardService
                .getDashboardStats();


        return res.status(200).json({

            success: true,

            data: stats

        });

    } catch (error) {

        console.error(
            "Dashboard stats error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Không thể lấy thống kê dashboard"

        });

    }

};


module.exports = {
    getDashboardStats
};