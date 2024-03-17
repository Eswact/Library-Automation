const express = require("express");
const router = express.Router();
const books = require("../controllers/books-controller.js");

// Retrieve all Books
router.get("/published", books.findAll);

module.exports = router;