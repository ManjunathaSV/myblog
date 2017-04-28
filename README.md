# myblog
An app which allows to create blogs and allows to comment on individual paragraphs of a blog 

# Features
 * Add a blog post
 * List the blog posts - by default returns first 5 blog posts - uses pagination
 * List the details of a particular blog post
 * Delete a particular blog post
 * Add a comment to a paragraph of a blog post
 * List all the comments of a blog post
 * List all the comments of a paragraph of a blog post
 * Delete a particular comment
 
# Technology and Framework
__Mongo__, __Express__, __Node.js__, __Mongoose__
 
# Steps to run the app
1. Clone the app to your local repository
2. Run the command `cd myblog` in the command shell
3. Run `npm install` - this installs all the dependencies
4. Run `npm start` - this starts the application
5. Run `npm stop` to stop the application

# API implemented

GET  [http://localhost:9000/api/blogs/](http://localhost:9000/api/blogs/)  
GET [http://localhost:9000/api/blogs?pageNum=*pageno*&numOfBlogs=*numberofblogs*](http://localhost:9000/api/blogs?pageNum=*pageno*&numOfBlogs=*numberofblogs*)  
GET [http://localhost:9000/api/blogs/:blogId](http://localhost:9000/api/blogs/:blogId)    
POST [http://localhost:9000/api/blogs/](http://localhost:9000/api/blogs/)  body = `{"title":"title", "content":"hi my first paragraph\n\n second paragraph"}`  
DELETE [http://localhost:9000/api/blogs/:blogId](http://localhost:9000/api/blogs/:blogId)  

GET  [http://localhost:9000/api/blogs/:blogId/comments](http://localhost:9000/api/blogs/:blogId/comments)  
GET  [http://localhost:9000/api/blogs/:blogId/comments/:commentId](http://localhost:9000/api/blogs/:blogId/comments/:commentId)  
POST  [http://localhost:9000/api/blogs/:blogId/comments](http://localhost:9000/api/blogs/:blogId/comments) 
body = `{"paragraphId":"paragraphId", "content":"hi my comment text"}`  
DELETE [http://localhost:9000/api/blogs/:blogId](http://localhost:9000/api/blogs/:blogId/comments/commentId) 

# Tests and Reports
* Run `npm test` in the command shell.
* Run `npm run report`in the command shell to generate the test reports

