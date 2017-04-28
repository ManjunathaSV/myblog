'use strict';

const express = require('express');
const CommentController = require('./comment.controller');

const router = express.Router();

let commentController = new CommentController();
router.get('/:blogId/comments', commentController.index);
router.get(':blogId/comments/:commentId', commentController.show);
router.post('/:blogId/comments', commentController.create);
router.delete('/:commentId', commentController.delete);

module.exports = router;