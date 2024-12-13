const mongoose = require("mongoose")
const shortid = require("shortid");



const BlogSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  author: {
    type: String,
    ref: "User",
    required: [true, "Author is required"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "Body is required"],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
    required: [true, "State is required"],
    trim: true,
  },
  read_time: {
    type: Number,
    required: [true, "Read time is required"],
    trim: true,
  },
  read_count: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: String,
    required: true,
    ref: "User",
  
  },


}, { timestamps: true });

BlogSchema.indexes({user_id: 1}, {unique: true});
BlogSchema.indexes({tags: 1}, {unique: true});


const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
