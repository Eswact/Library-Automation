const users = require("../controllers/users-controller.js");
const endpoints= [
    { method: "get", path: "published", func: users.findAll },
    { method: "post", path: "login", func: users.login }
]

module.exports = endpoints;