const { body }= require("express-validator");
const BlogModel = require("../models/blog.model")

const blogValidationSchema = 
   [
    body("title")
      .notEmpty().withMessage("Title is required")
      .isString().withMessage("Title must be a string")
      .isLength({ max: 150 }).withMessage("Title must not exceed 150 characters")
      .custom(async (value) => {
        const existingBlog = await BlogModel.findOne({ title: value });
        if (existingBlog) {
          throw new Error('Title already exists. Please choose a different title.');
        }
        return true;
      }),
      
    
    body("body")
      .notEmpty().withMessage("Body is required")
      .isString().withMessage("Body must be a string"),

    body("description")
      .optional()
      .isString().withMessage("Description must be a string")
      .isLength({ max: 500 }).withMessage("Description must not exceed 500 characters"),

    body("tags")
      .optional()
      .isArray().withMessage("Tags must be an array")
      .custom((tags) => {
        if (tags.some(tag => typeof tag !== "string")) {
          throw new Error("Each tag must be a string");
        }
        return true;
      }),
  ];


module.exports = {
  blogValidationSchema

}


