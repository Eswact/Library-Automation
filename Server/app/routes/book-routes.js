const books = require("../controllers/books-controller.js");
const endpoints= [
    { method: "get", path: "published", func: books.findAll },
    { method: "post", path: "find/:id", func: books.findOne },
    { method: "post", path: "create", func: books.create },
    { method: "post", path: "update/:id", func: books.update },
    { method: "post", path: "delete/:id", func: books.deleteOne }
]

module.exports = endpoints;