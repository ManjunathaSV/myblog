'use strict';

const express = require('express');
const BlogController = require('./blog.controller');

const router = express.Router();

let blogController = new BlogController();
router.get('/', blogController.index);
router.get('/:blogId', blogController.show);
router.post('/', blogController.create);
router.delete('/:blogId', blogController.delete);
router.put('/:blogId', blogController.update);


module.exports = router;