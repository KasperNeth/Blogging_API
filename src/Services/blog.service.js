const BlogModel = require("../models/blog.model");


const CaculateReadTime = (body) => {
  const wordsPerMinute = 200;
  let wordCount = 0;

  body.split(" ").forEach(word => {
    wordCount += 1;
  });

  return Math.ceil(wordCount / wordsPerMinute);
};

const createBlog = async (data, authorId) => {

  try {
    const readTime = CaculateReadTime(data.body);
    const newBlog = new BlogModel({
      ...data, 
      read_time: readTime,
       author: authorId, 
       state: "draft"
      });
    const blog = await newBlog.save();

    return {
      code: 201,
      success: true,
      message: "Blog created successfully",
      data: blog,
    }

  }catch (err){
    return {
      code: 500,
      success: false,
      message: err.message || "Internal server error",
      data: null,
      
    }

  }

}

const getBlogById = async (blogId) => {
  try {
    const blog = await BlogModel.findOneAndUpdate(blogId).populate("author", "username email","tags");
    if(!blog){
      return {
        code: 404,
        success: false,
        message: "Blog not found",
        data: null,
      }
    }
    return {
      code: 200,
      success: true,
      message: "Blog found",
      data: blog,
    }

  }catch (err){
    return {
      code: 500,
      success: false,
      message: err.message || "Internal server error",
      data: null,
    }
  }
}

const updateBlog = async (blogId, data, authorId) => {
  try {
    const blog = await BlogModel.findOneAndUpdate({_id: blogId, author: authorId}, data, {new: true});
    if(!blog){
      return {
        code: 404,
        success: false,
        message: "Blog not found or you are not the author",
        data: null,
      }
    }

   
    const readTime = CaculateReadTime(data.body);
    blog.read_time = readTime;
    const updatedBlog = await blog.save();
    return {
      code: 200,
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    }

    }
    catch (err){
      return {
        code: 500,
        success: false,
        message: err.message || "Failed to update blog",
        data: null,
      }
    }
 

}


const deleteBlog = async (blogId, authorId) => {
  try{
    const blog = await BlogModel.findOneAndDelete({_id: blogId, author: authorId});
    if(!blog){
      return {
        code: 404,
        success: false,
        message: "Blog not found or you are not the author",
        data: null,
      };
    };

    return {
      code: 200,
      success: true,
      message: "Blog deleted successfully",
      data: null,
    }
     
    


  }
  catch (err){
    return {
      code: 500,
      success: false,
      message: err.message || "Failed to delete blog",
      data: null,
    }
  }
}


const getPublishBlog = async(filter={}, pagination = {limit:20, page:1}, sorting = {timestamp: -1} ) =>{
  try{
    const searchField =  {};

    if(filter.tags){
      searchField.tags = {$in: filter.tags.split(",")};
    }
    if(filter.author){
      searchField["author.username"] = {$regex: filter.author, $options: "i"};
    }
    if(filter.title){
      searchField.title = {$regex: filter.title, $options: "i"};
    }

    const query = {state: "published", ...searchField};

    const limit = parseInt(pagination.limit);
    const page = parseInt(pagination.page - 1) * limit;

    const blogs = await BlogModel.find(query).populate("author", "username email").sort(sorting).limit(limit).skip(page);

    return {
      code: 200,
      success: true,
      message: "Published blogs found",
      data: blogs,
    }

  

}catch(err){
  return {
    code: 500,
    success: false,
    message: err.message || "Failed to get published blogs",
    data: null,
  }
}
}



module.exports = {
  CaculateReadTime,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getPublishBlog,
};
