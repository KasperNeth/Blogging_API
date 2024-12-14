const Router = require("express").Router;
const AuthController = require("../controllers/auth.controller");
const validate = require("../validationSchema/auth.validation");
const messageFormatter = require("../middlewares/validateErrorFormatter.middleware");


const route = Router();

route.post("/login", validate.loginValidationSchema, messageFormatter, AuthController.Login);
route.post("/signup", validate.registerValidationSchema, messageFormatter, AuthController.Signup);



module.exports = route;