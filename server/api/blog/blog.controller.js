'use strict';
const Blog = require('./blog.model.js');
const Q = require('q');
const querystring = require('querystring');
const url = require('url');
const _ = require('lodash');

class BlogController{
  constructor(){
  }

  /* Method which returns all the blogs based under the given limit, does paging */
  index(req, res){
    let filterQuery = url.parse(req.url , true).query;
    let filterObj = {};
    filterObj['limit'] = filterQuery.numOfBlogs||5;
    filterObj['offset'] = (filterQuery.pageNum||0)*filterObj['limit'];
      Blog.paginate({},filterObj).then((result)=>{
        res.status(200).json(result.docs);
      }).catch((err)=>{
        res.status(500).send(err);
      })
  }
  /** method which returns a blog based on blogId **/
  show(req, res){
    Blog.findById(req.params.blogId).exec().then((blog)=>{
      if(!blog) { 
        return res.status(404).send('Not Found'); 
      }else{
        return res.status(200).send(blog);
      }
    }).catch((err)=>{
      res.status(500).send(err);
    });
  }
/** method which creates a blog **/
  create(req, res){
    new BlogController().buildBlogContent(req.body)
      .then((blog)=>{ return Blog.create(blog) })
      .then((result)=>{
        return res.status(201).json(result);
      })
      .catch((err)=>{
        if(err.errno == 400){
          return res.status(400).send(err);
        }else{ return res.status(500).send(err); }
      });
  }
  /** method which deletes a blog based on blogId**/
  delete(req, res){
    Blog.findById(req.params.blogId).exec().then((blog)=>{
      if(!blog) { return res.status(404).send('Not Found'); }
        blog.remove(()=> {
          return res.status(204).send('No Content');
        });
      }).catch((err)=>{
          return res.status(500).send(err);
      });
  }
  /** Updates an existing blog in the DB**/
  update(req, res) {
    req.body.updated = Date.now();
    Blog.findById(req.params.blogId).exec().then((blog)=>{
      if(!blog) { return res.status(404).send('Not Found'); }
      let updated = blog;
      if(req.body.title){ updated.title = req.body.title}
      updated.paragraphs = _.unionWith(blog.paragraphs, req.body.paragraphs);
      return updated.save().exec();
    }).then((updatedBlog)=>{
      return res.status(200).json(updatedBlog);
    });
  }

  /** A helper method to create a blog **/
  buildBlogContent(blog){
    let defered = Q.defer();
    let myBlog = {};
      if(!blog.content||!blog.title){
        defered.reject(new Error().errno = 400);
      }else{
        myBlog['title'] = blog.title;
        myBlog['paragraphs'] = [];
        let paragraphs = blog.content.split('\n\n'); 
        paragraphs.forEach(function(element){
          let temp = {};
          temp['content'] = element;
          myBlog['paragraphs'].push(temp);
        })
        defered.resolve(myBlog);
      }
  return defered.promise;
  }

}
module.exports = BlogController;