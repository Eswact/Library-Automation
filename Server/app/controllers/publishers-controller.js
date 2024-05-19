const db = require("../models");
const publishers = db.publishers;

// Get all publishers from the database.
const findAll = async (req, res) => {
  try {
    const publishersData = await publishers.find();
    res.json(publishersData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving publishers." });
  }
};

module.exports = {
    findAll,
};
  