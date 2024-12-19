const BlogService = require("../Services/blog.service")
const  {SearchQuery} = require("../utils/helpers.utils")

const getBlogs = async (req, res) => {
   const { filter, pagination, sorting } = SearchQuery(req.query);
    
    filter.state = "published";
    
      const serviceResponse = await BlogService.getBlogs(filter, pagination, sorting);
      res.status(serviceResponse.code).json(serviceResponse);
    

}

const getBlogById = async (req, res) => {

  const blogId = req.params.blogId;
  
  const serviceResponse = await BlogService.getBlogById(blogId);
  res.status(serviceResponse.code).json(serviceResponse);

}

module.exports = {
  getBlogs,
  getBlogById
}