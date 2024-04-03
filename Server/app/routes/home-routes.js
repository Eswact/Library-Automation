const home = require("../controllers/home-controller.js");
const endpoints= [
    { method: "get", path: "banners/published", func: home.findAllBanners },
]

module.exports = endpoints;