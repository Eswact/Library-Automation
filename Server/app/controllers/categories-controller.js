const db = require("../models");
const categories = db.categories;

// Get all categories from the database.
const findAll = async (req, res) => {
  try {
    const categoriesData = await categories.find();
    res.json(categoriesData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving categories." });
  }
};

// Get category with an id
const findOne = async (req, res) => {
  const catId = req.params.id;
  try {
    const categoriesData = await categories.find();
    const response = categoriesData.find((item) => item.catId == catId);
    (!response) 
      ? res.status(404).send({ message: "Not found category with id " + catId })
      : res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving category with id=" + catId });
  }
};

// Create and save a new category
const create = async (req, res) => {
  try {
    const latestCategory = await categories.findOne().sort({ catId: -1 });
    req.body.catId = latestCategory ? latestCategory.catId + 1 : 1;
    const newCategory = new categories(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the category." });
  }
};

// Delete a category with the specified id in the request
const deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const categoryDeleteResult = await categories.deleteOne({ catId: id });
    (categoryDeleteResult.deletedCount === 0)
      ? res.status(404).send({ message: "Not found category with id " + id })
      : res.status(200).send({ message: "category deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Could not delete category with id=" + id });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  deleteOne
};
