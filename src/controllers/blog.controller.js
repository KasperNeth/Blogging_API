const BlogService = require("../Services/blog.service")
const {SearchQuery} = require("../utils/helpers.utils")

const createBlog = async (req, res) =>{
  const authorId = req.userid;        
  const payload = req.body;


  const serviceResponse = await BlogService.createBlog(payload, authorId);
  res.status(serviceResponse.code).json(serviceResponse);
}

const getBlogById = async (req, res) => {
const{blogId} =req.params
const authorId = req.userid;  


  const serviceResponse = await BlogService.getBlogById(blogId, authorId);
  res.status(serviceResponse.code).json(serviceResponse);
}


const updateBlog = async (req, res) => {
  const blogId  = req.params.blogId; 
  const authorId = req.userid; 
  const data = req.body; 
  
  const serviceResponse = await BlogService.updateBlog(blogId, data, authorId);
  res.status(serviceResponse.code).json(serviceResponse);
 
}

const deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const authorId = req.userid;

  const serviceResponse = await BlogService.deleteBlog(blogId, authorId);
  res.status(serviceResponse.code).json(serviceResponse);
}



const getBlog = async (req, res) => {
  const { filter, pagination, sorting } = SearchQuery(req.query);
  // Only blogs owned by the logged-in user
  filter.author = req.userid;
 
 //search by both state in user/author mode
  if (req.query.state) filter.state = req.query.state;

  const serviceResponse = await BlogService.getBlogs(filter, pagination, sorting);
  res.status(serviceResponse.code).json(serviceResponse);

}


module.exports = {
   createBlog, 
   getBlogById,
    updateBlog,
    deleteBlog,
    getBlog
  };

