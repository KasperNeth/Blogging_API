
# Second Semester Project For Altschool Backend Exams

# Blogging API

#### OVERVIEW
This Blogging API, built with Node.js, Express, MongoDB, and Mongoose, enables users to manage their blog content. Features include authentication, CRUD operations, pagination, filtering, sorting, searching, reading time calculation, and read count tracking.
## Features
●Public Access: Non-registered users can view and fetch published blogs by ID but cannot modify content. 
● Registered Users: Can create, update, delete, and manage their blogs.  
● Supports filtering, sorting, and pagination, and search by title, author.username, tags, read time, and read count.
● Blog States: Blogs can be saved as draft or published.
● User Management: Registration, login, and secure JWT authentication. 
● Error Handling: Includes robust validation and testing for a seamless experience.
● Tracks reading time and read count

## installation
- Clone the repository
```bash
https://github.com/KasperNeth/Blogging_API.git
```
```bash
cd Blogging_API
```

## usage
- Install  `Node.js` and `MongoDB`
- Create a MongoDB database
- Run `npm install` to install dependencies
- Create a `.env` file in the root directory and add the following environment variables:
  - `PORT` - Port number for the server
  - `MONGO_URI` - MongoDB connection string
  - `JWT_SECRET` - Secret key for JWT
  - `JWT_EXPIRE` - JWT expiration time
  - `JWT_COOKIE_EXPIRE` - JWT cookie expiration time
  - `NODE_ENV` - Environment (development/production)
- Run `npm run dev` to start the server in development mode
- Run `npm start` to start the server in production mode
- Use Postman or any API client to test the endpoints



## Endpoints
#### Authentication
`POST /V1/auth/signup:` Create a new user account.
Requires first_name,last_name, username, email, password (minimum 8 characters, must include one number, lowercase, uppercase, special character) sends a JWT token upon successful registration
`POST /v1/auth/login:` login with email and password.

#### Blog for users
`GET /api/v1/users/posts:` Fetch all blogs by the logged-in user posts in draft and published states. Can be filtered by state, sorted, and paginated, searched by title, author.username, tags,OrderBy read_time, and read_count and sorted by timestamp.

`GET /api/v1/users/posts/:blogId:` Fetch a single blog by ID by the logged-in user.but the count will not be incremented.

`POST /api/v1/users/posts:` Create a new blog post. Requires title, body, description and tags.Which is an Array` [" "]` `draft` by default.
and can be published by updating the  `state` to `published`.
`content required: {title, body, tags,decription}`

`PUT /api/v1/user/posts/:blogId:` Update a blog post by ID. Blogs can be updated in both draft and published states. when the body is updated the read time will be recalculated. and read count will still have same value.

`DELETE /api/v1/user/posts/:blogId:` Delete a blog post by ID.
Only the author of the blog can delete the blog. another,user/visitor cannot delete the blog.

#### Blog for public

`GET /api/v1/posts:` Fetch all published blogs. Can be filtered sorted, and paginated, searched by title, author.username, tags, orderBy read_time, and read_count and sorted by timestamp.

`GET /api/v1/posts/:blogId:` Fetch a single blog by ID. The read count will be incremented by 1.

#### Error Handling
The API includes robust error handling for all endpoints, including validation, authentication, and authorization errors.

#### Security

The API includes secure JWT authentication for user registration and login. Passwords are hashed using bcrypt.

#### Testing

The API includes comprehensive testing using Jest and Supertest for all endpoints, including authentication, CRUD operations, and error handling.



#### Documentation
The API includes comprehensive documentation using Postman that covers all endpoints, request/response formats, and error handling.

### Postman Documentation
- Postman Documentation for all endpoints
and how to use the API along with various example the request and response format
- [Here](https://documenter.getpostman.com/view/38620702/2sAYJ3FhZa)

#### Deployment
```bash
https://blogging-api-0nla.onrender.com/
```









👤 **Author**
## Adeoye Okeowo
#### for any enquiry or question, you can reach me at the following
- GitHub: [@githubhandle](https://github.com/kasperNeth)
- Twitter: [@twitterhandle](https://twitter.com/KasperNeth)
- LinkedIn: [@LinkedIn](https://www.linkedin.com/in/adeoye-okeowo-245381334/)
- Gmail: [Email](mailto:Okeowa244@gmail.com)
- gmail: [gmail](mailto:okeowoa244@gmail.com)