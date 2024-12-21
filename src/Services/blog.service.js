const BlogModel = require("../models/blog.model");
const {calculateReadTime} = require("./calculateReadtime.service")



const createBlog = async (data, authorId) => {

  try {
    const readTime = calculateReadTime(data.body);
    const newBlog = new BlogModel({
      title: data.title,
      description: data.description,
      body:data.body,
      tags: data.tags,
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
      message: err.message || "Internal server error, Fail to create blog",
      data: null,
      
    }

  }

}

const getBlogById = async (blogId, authorId) => {
  try {
    const blog = await BlogModel.findOne({_id: blogId}).populate("author", "username email first_name last_name"); 
    if(!blog){
      return {
        code: 404,
        success: false,
        message: "Blog not found",
        data: null,
      }
    }


    //check unauthorized users access to draft blog
    if ((!authorId || !blog.author._id.equals(authorId)) && blog.state !== "published"){
      return {
        code: 403,
        success: false,
        message: "Unauthorized access",
        data: null,
      }
    }
    //check if user is not the author and increment read count
    if (!authorId || !blog.author._id.equals(authorId)) {
      //increment read count if user is not the author
     await BlogModel.findOneAndUpdate({ _id: blogId }, { $inc: { read_count: 1 } },{ new: true })

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
    const blog = await BlogModel.findById(blogId);
    if(!blog){
      return {
        code: 404,
        success: false,
        message: "Blog not found",
        data: null,
      }
    }
   //check  originality of blog ownership before updating
    if ((!authorId || !blog.author._id.equals(authorId))){
      return {
        code: 403,
        success: false,
        message: "Unauthorized: You are not allowed to update this blog.",
        data: null,
      };
    }

   
    //allow body to update in draft and published state
    if(data.body){
      blog.body = data.body;

      //update read time if body is updated
    const readTime = calculateReadTime(data.body);
    blog.read_time = readTime;
}
 //allow title, tags, description to update in draft and published state
 if (data.title) blog.title = data.title;
 if (data.tags) blog.tags = data.tags;
  if (data.description) blog.description = data.description;
  if (data.state) blog.state = data.state;
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
    const blog = await BlogModel.findById(blogId);
    if(!blog){
      return {
        code: 404,
        success: false,
        message: "Blog not found ",
        data: null,
      };
    };

     //check  originality of blog ownership before updating
     if ((!authorId || !blog.author._id.equals(authorId))){
      return {
        code: 403,
        success: false,
        message: "Unauthorized: You are not allowed to update this blog.",
        data: null,
      };
    }
    
    await BlogModel.findByIdAndDelete(blogId);

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


const getBlogs = async(filter={}, pagination ={}, sorting = {} ) =>{
  try{
   
   const {limit= 20, page = 1} = pagination;

   options ={
     limit: parseInt(limit),
     page: parseInt(page),
     sort: sorting,
   }


   //
    const blogs = await BlogModel.paginate(filter, options)

    if (blogs.docs.length === 0) {
      return {
        code: 404,
        success: false,
        message: "No blogs found for the provided query.",
        data: null,
      };
    }

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
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogs
};
