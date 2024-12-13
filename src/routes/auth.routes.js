const Router = require("express").Router;
const AuthController = require("../controllers/auth.controller");
const validate = require("../validations/auth.validation");
const validateRequest = require("../middlewares/validateRequest.middleware");


const route = Router();

route.post("/login", validate.loginValidationRules, validateRequest, AuthController.Login);
route.post("/signup", validate.registerValidationRules, validateRequest, AuthController.Signup);



module.exports = route;