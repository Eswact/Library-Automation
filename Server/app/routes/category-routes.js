const categories = require("../controllers/categories-controller.js");
const endpoints= [
    // Retrieve all Categories
    { method: "get", path: "published", func: categories.findAll }
]

module.exports = endpoints;