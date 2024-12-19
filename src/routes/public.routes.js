const Router = require("express").Router;
const publicController = require("../controllers/public.controller");


const route = Router()

route.get("/", publicController.getBlogs)
route.get("/:blogId", publicController.getBlogById)

module.exports = route