const db = require("../models");
const company = db.company;

// Get all company infos from the database.
const getInfos = async (req, res) => {
  try {
    const companyInfos = await company.find();
    res.json(companyInfos[0]);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving company infos." });
  }
};

module.exports = {
    getInfos
};
