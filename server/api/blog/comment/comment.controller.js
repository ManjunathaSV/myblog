'use strict';
const Comment = require('./comment.model.js');
const Q = require('q');
const querystring = require('querystring');
const url = require('url');
const mongoose = require('mongoose');
const _ = require('lodash');

class CommentController{
  constructor(){
  }

  /* Method which returns all the comments based on the parameters sent, does paging */
  index(req, res){
    let filterQuery = url.parse(req.url , true).query;
    let selectionObj = {};
      if(filterQuery.paragraphId){
        selectionObj['paragraphId'] = filterQuery.paragrpahId;   
      }
      selectionObj['blogId'] = req.params.blogId;
      let filterObj = {};
      filterObj['limit'] = filterQuery.numOfComments||5;
      filterObj['offset'] = (filterQuery.pageNum||0)*filterObj['limit'];
        Comment.paginate(selectionObj,filterObj).then((result)=>{
          res.status(200).json(result.docs);
        }).catch((err)=>{
            res.status(500).send(err);
        })
  }
  
  /** method which returns a comment based on commentId **/
  show(req, res){
    Comment.findById(req.params.commentId).exec().then((comment)=>{
      if(!comment) { return res.status(404).send('Not Found'); }
      else{
        return res.status(200).send(comment);
      }
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }

/** method which creates a comment **/
  create(req, res){
    new CommentController()
    .addIdFieldsToComment(req.params, req.body)
    .then((comment)=>{ 
      return Comment.create(comment) 
    })
    .then((result)=>{
      return res.status(201).json(result);
    })
    .catch((err)=>{
      return res.status(500).send(err.message);
    });
  }

/** method which deletes a comment **/
  delete(req, res){
    Comment.findById(req.params.commentId).exec().then((Comment)=>{
      if(!Comment) { return res.status(404).send('Not Found'); }
      Comment.remove(()=> {
        return res.status(204).send('No Content');
      });
    }).catch((err)=>{
          return res.status(500).send(err);
    });
  }

/** method which updates a comment based on commentId**/
  update(req, res) {
  req.body.updated = Date.now();
  Comment.findById(req.params.commentId).exec()
    .then((comment)=>{
      if(!comment) { return res.status(404).send('Not Found'); }
      let updated;
      updated= _.merge(comment, req.body);
      return updated.save().exec();
    })
    .then((updatedComment)=>{
        return res.status(200).json(updatedComment);
    })
    .catch((err)=>{
        return res.status(304).send(err);
    })
  }
  
  /** A helper method to construct a valid comment **/
  addIdFieldsToComment(params, comment){
    let defered = Q.defer();
    comment.blogId = params.blogId;
    comment.paragraphId = comment.paragraphId;
    defered.resolve(comment);
  return defered.promise;
  }

}
module.exports = CommentController;