const books = require("../controllers/books-controller.js");
const endpoints= [
    { method: "get", path: "published", func: books.findAll },
    { method: "post", path: "find/:id", func: books.findOne }
]

module.exports = endpoints;