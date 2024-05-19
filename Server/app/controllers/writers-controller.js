const db = require("../models");
const writers = db.writers;

// Get all writers from the database.
const findAll = async (req, res) => {
  try {
    const writersData = await writers.find();
    res.json(writersData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving writers." });
  }
};

module.exports = {
    findAll,
};
  