const Router = require("express").Router;
const BlogController = require("../controllers/blog.controller")
const validateBody = require("../validationSchema/blog.validation")
const messageFormatter = require("../middlewares/validateErrorFormatter.middleware")
const verificationToken = require("../middlewares/authJwt.middleware")



const route = Router()

route.post("/posts", verificationToken, validateBody.blogValidationSchema, messageFormatter, BlogController.createBlog)
route.get("posts/:blogId", verificationToken, BlogController.getBlogById)
route.get("/posts", verificationToken, BlogController.getBlog)
route.put("posts/:blogId", verificationToken, validateBody.blogValidationSchema, BlogController.updateBlog)
route.delete("posts/:blogId", verificationToken, BlogController.deleteBlog)

module.exports = route

