const Router = require("express").Router;
const AuthRoute = require("../routes/auth.routes");
const BlogRoute = require("../routes/blog.routes");
const PublicRoute = require("../routes/public.routes");


const route = Router();

route.use("/v1/auth", AuthRoute);
route.use("/api/v1/users", BlogRoute);
route.use("/api/v1/posts", PublicRoute);



module.exports = route;