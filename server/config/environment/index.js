'use strict';

// Development specific configuration

module.exports = {
  env: process.env.NODE_ENV,
    // Server port
  port: process.env.PORT || 9000,

  // Server IP
  host: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/my-blogs',
    options: {
      db: {
        safe: true
      }
    }
  }
}
