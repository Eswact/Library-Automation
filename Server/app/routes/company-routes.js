const company = require("../controllers/company-controller.js");
const endpoints= [
    { method: "get", path: "published", func: company.getInfos },
    { method: "post", path: "sendMail", func: company.sendMail }
]

module.exports = endpoints;