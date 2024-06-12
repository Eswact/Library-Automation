const home = require("../controllers/home-controller.js");
const endpoints= [
    { method: "get", path: "banners/published", func: home.findAllBanners },
    { method: "post", path: "banners/create", func: home.createBanner },
    { method: "post", path: "banners/delete/:id", func: home.deleteBanner },
]

module.exports = endpoints;