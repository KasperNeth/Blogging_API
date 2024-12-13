const Router = require("express").Router;
const AuthRoute = require("../routes/auth.routes");


const route = Router();

route.use("/auth", AuthRoute);



module.exports = route;