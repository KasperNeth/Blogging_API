const mongoose = require("mongoose")




const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    ref: "User",
    trim: true
  },
  body: {
    type: String,
    required: [true, "Body is required"],
    trim: true
  },
  tags: {
    type: [String],
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
    trim: true,
  },
  read_time: {
    type: Number,
    trim: true,
  },
  read_count: {
    type: Number,
    default: "0 min",
 }

}, { timestamps: true });

BlogSchema.indexes({author: 1});
BlogSchema.indexes({tags: 1});


const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
