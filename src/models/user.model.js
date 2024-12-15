const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    lowercase: true,
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    tolowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this;
  
  if(!user.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  }
  catch(err){
    console.log(`Error hashing password for user: ${err.message}`);
    next(err);
  }

});


UserSchema.methods.isValidPassword = async function (password){
  const user = this;
  try {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }
  catch(err){
    console.log(`Error comparing password for user: ${err.message}`);
    return false;
  }
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;