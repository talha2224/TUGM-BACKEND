const { TermsModel } = require("../models/terms.model");

const create = async (req, res) => {
    try {
        const Term = new TermsModel(req.body);
        await Term.save();
        return res.status(200).json({ data: Term, msg: null, status: 200 });
    }
    catch (error) {
        console.error("Error creating Term:", error);
        return { success: false, msg: "Failed to create Term" };
    }
};
const getAll = async (req, res) => {
    try {
        const Terms = await TermsModel.find({});
        return res.status(200).json({ data: Terms, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching Terms:", error);
        return { success: false, msg: "Failed to fetch Terms" };
    }
};
const updateTerm = async (req, res) => {
    try {
        const Terms = await TermsModel.findByIdAndUpdate(req.params?.id, req.body, { new: true });
        return res.status(200).json({ data: Terms, msg: null, status: 200 });
    } catch (error) {
        console.error("Error fetching Terms:", error);
        return { success: false, msg: "Failed to fetch Terms" };
    }
};
module.exports = { create, getAll, updateTerm };
