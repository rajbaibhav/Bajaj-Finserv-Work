const { processGraph } = require('../utils/graphProcessor');
const ProcessLog = require('../models/ProcessLog');

exports.processGraphRequest = async (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ error: "Invalid input format. Expected { data: [...] }" });
        }

        const result = processGraph(data);

        // TODO: Update these with your actual identity details before submitting
        const finalResponse = {
            user_id: "br1465",
            email_id: "br1465@srmist.edu.in",
            college_roll_number: "RA2311029010020",
            hierarchies: result.hierarchies,
            invalid_entries: result.invalid_entries,
            duplicate_edges: result.duplicate_edges,
            summary: result.summary
        };


        ProcessLog.create({
            inputData: data.map(item => String(item)),
            responseData: finalResponse
        }).catch(err => console.error("Error logging to DB:", err));

        return res.status(200).json(finalResponse);

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
