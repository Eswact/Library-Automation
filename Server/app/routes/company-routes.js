const company = require("../controllers/company-controller.js");
const endpoints= [
    { method: "get", path: "published", func: company.getInfos }
]

module.exports = endpoints;