const UserModel = require('../models/user.model');
const TokenGenerator = require('../utils/Jwt');




const Signup = async (data)=>{
  const {first_name, last_name, username, email, password} = data;
  try{
   const existingUser = await UserModel.findOne({email, username});
   if(existingUser){
     throw new Error('User already exists');
   }
    const newUser = new UserModel({
      first_name,
      last_name,
      username,
      email,
      password
    });
    const payload = ({ _id: newUser._id, email: newUser.email, username: newUser.username});
    await newUser.save();
    return{
      code: 201,
      success: true,
      data:{
        username: newUser.username,
        email: newUser.email,
        token: TokenGenerator(payload)

      },
      message: 'User created successfully'

    }
  }catch(err){
    console.log(`Error creating user: ${err.message}`);
    return{
      code: 500,
      success: false,
      data: null,
      message:'user creation failed, please try again'
    }

  }
   
}



const Signin = async(email, password)=> {
  try{
    const User = await UserModel.findOne({email});
    if(!User){
      return{
        code: 404,
        success: false,
        data: null,
        message: 'invalid credentials'
      }
    }
    const isValid = await User.isValidPassword(password);
    if(!isValid){
      return{
        code: 401,
        success: false,
        data: null,
        message: 'invalid credentials'
      }
    }
  
    const payload = ({_id: User._id, email: User.email, username: User.username});
    return{
      code: 200,
      success: true,
      data:{
        username: User.username,
        email: User.email,
        token: TokenGenerator(payload)
      },
      message: 'User logged in successfully'
    }

    

  }catch(err){
    console.log(`Error logging in user: ${err.message}`);
    return{
      code: 500,
      success: false,
      data: null,
      message: 'user login failed, please try again'
    }

  }


}

module.exports= {Signup, Signin};