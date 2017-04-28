'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  paragraphs:[{content: String}],
  updated: {type: Date, default: Date.now}
});

BlogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Blog', BlogSchema);
