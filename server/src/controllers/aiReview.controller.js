const AIReviewService = require("../services/ai/aiReview.service");

const aiReviewService = new AIReviewService();

const generateRepositoryReview = async (req, res) => {
    try {
        const { repositoryId } = req.params;

        const review =
            await aiReviewService.generateRepositoryReview(
                repositoryId
            );

        return res.status(200).json({
            success: true,
            message: "AI repository review generated successfully.",
            data: review,
        });
    } catch (error) {
        console.error("AI Review Generation Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to generate AI review.",
        });
    }
};

const getRepositoryReview = async (req, res) => {
    try {
        const { repositoryId } = req.params;

        const review =
            await aiReviewService.getRepositoryReview(repositoryId);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "AI review not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: review,
        });
    } catch (error) {
        console.error("Get AI Review Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch AI review.",
        });
    }
};

const refreshRepositoryReview = async (req, res) => {
    try {
        const { repositoryId } = req.params;

        const review =
            await aiReviewService.refreshRepositoryReview(
                repositoryId
            );

        return res.status(200).json({
            success: true,
            message: "AI repository review refreshed successfully.",
            data: review,
        });
    } catch (error) {
        console.error("Refresh AI Review Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to refresh AI review.",
        });
    }
};

module.exports = {
    generateRepositoryReview,
    getRepositoryReview,
    refreshRepositoryReview,
};