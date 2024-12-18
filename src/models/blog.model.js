const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2");




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
    type: mongoose.Schema.Types.ObjectId,
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
    default: 0,
 }

}, { timestamps: true });


BlogSchema.plugin(mongoosePaginate);

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
