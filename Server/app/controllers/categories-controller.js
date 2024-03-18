const db = require("../models");
const categories = db.categories;

// Get all categories from the database.
const findAll = async (req, res, next) => {
  try {
    const categoriesData = await categories.find();
    res.json(categoriesData);
  } catch (error) {
    next(error); // Hata durumunda hatayı yönlendirin
  }
};

module.exports = {
  findAll // Middleware işlevini export edin
};
