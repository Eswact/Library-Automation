const db = require("../models");
const banners = db.banners;

// Get all banners from the database.
const findAllBanners = async (req, res) => {
  try {
    const bannersData = await banners.find();
    res.json(bannersData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving banners." });
  }
};

module.exports = {
  findAllBanners
};