const books = require("../controllers/books-controller.js");
const endpoints= [
    // Retrieve all Categories
    { method: "get", path: "published", func: books.findAll }
]

module.exports = endpoints;