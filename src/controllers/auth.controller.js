const Authservice = require("../Services/auth.service");


const Signup = async (req, res) => {

  const payload = req.body;
  const sigupResponse = await Authservice.Signup({first_name: payload.first_name, last_name: payload.last_name, username: payload.username, email: payload.email, password: payload.password});
  res.status(sigupResponse.code).json(sigupResponse);
}


const Login = async (req, res) => {
  const payload = req.body;
  const loginResponse = await Authservice.Signin(payload.email, payload.password);
  res.status(loginResponse.code).json(loginResponse);

}


module.exports = { Signup, Login };