const categories = require("../controllers/categories-controller.js");
const endpoints= [
    { method: "get", path: "published", func: categories.findAll },
    { method: "post", path: "find/:id", func: categories.findOne },
    { method: "post", path: "create", func: categories.create },
    { method: "post", path: "delete/:id", func: categories.deleteOne }
]

module.exports = endpoints;