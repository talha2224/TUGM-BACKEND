const { FeedBackModel } = require("../models/feedback.model");
const { PerformanceModel } = require("../models/performance.model");

const getPerformance = async (req, res) => {
    try {
        let feedback = await FeedBackModel.find({ feedbackTo: req?.params?.id });
        let aiAnalysis = await PerformanceModel.find({ userId: req?.params?.id });

        // Add feedback score based on totalStars
        let feedbackWithScores = feedback.map(feedbackItem => {
            let feedbackScore = (feedbackItem.totalStars / 5) * 100;
            return { ...feedbackItem.toObject(), feedbackScore: feedbackScore };
        });

        // Calculate totalStars and average feedback score
        let totalStars = feedback.reduce((sum, feedbackItem) => sum + feedbackItem.totalStars, 0);
        let avgFeedbackScore = (totalStars / (feedback.length * 5)) * 100; // Average score in percentage
        
        // Calculate the average for smoothness, creativity, and versality
        let totalSmoothness = aiAnalysis.reduce((sum, analysisItem) => sum + analysisItem.smoothness, 0);
        let totalCreativity = aiAnalysis.reduce((sum, analysisItem) => sum + analysisItem.creativity, 0);
        let totalVersality = aiAnalysis.reduce((sum, analysisItem) => sum + analysisItem.versality, 0);
        
        let avgSmoothness = totalSmoothness / aiAnalysis.length;
        let avgCreativity = totalCreativity / aiAnalysis.length;
        let avgVersality = totalVersality / aiAnalysis.length;

        // Overall score calculation
        let overallAvg = ((avgFeedbackScore + avgSmoothness + avgCreativity + avgVersality) / 4).toFixed(2);

        return res.status(200).json({
            msg: null,
            data: {
                feedback: feedbackWithScores,
                aiAnalysis,
                avgFeedbackScore: avgFeedbackScore.toFixed(2),
                avgSmoothness: avgSmoothness.toFixed(2),
                avgCreativity: avgCreativity.toFixed(2),
                avgVersality: avgVersality.toFixed(2),
                overallAvg: overallAvg
            },
            status: 200
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", status: 500 });
    }
};

module.exports = { getPerformance };
