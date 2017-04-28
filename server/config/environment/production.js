'use strict';

// Production specific configuration

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongolab:///my-blogs'
  },

// Should we populate the DB with sample data?
  seedDB: false
};
