const jwt =  require("jsonwebtoken");
require("dotenv").config();

const Tokengenerator = (user)=>{
  const SECRET = process.env.JWT_SECRET;
  const expiresIn = 60 * 60;
    const Token = jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email
       
    },
    SECRET,
    {expiresIn: expiresIn}

   
        
    );
    return Token
  }



  module.exports = Tokengenerator;