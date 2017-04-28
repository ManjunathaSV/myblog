/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
// Insert routes below
  app.use('/api/blogs', require('./api/blog'));
  app.use('/api/blogs', require('./api/blog/comment'));
};
