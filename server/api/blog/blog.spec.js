/** Tests for blog api**/
'use strict';
const request = require('supertest');
const express = require('express');

const app = require('../../app');

/**test for retrieving all the blogs**/
describe('GET /api/blogs', function() {
  it('repsond with a list of blogs', function(done) {
    request(app)
      .get('/api/blogs')
      .set('Accept', 'application/json')
      .expect('Content-Type','application/json; charset=utf-8')
      .expect(200, done);
  });
});

/**test for creating blogs**/
describe('post /api/blogs', function() {
  /**a valid blog **/
  it('repsond with blog created status', function(done) {
    let blog ={"title":"blogOne","content":"hello my first paragraph\n\n my second paragraph"};
    request(app)
      .post('/api/blogs')
      .send(blog)
      .set('Accept', 'json')
      .expect(201, done);
  });
  /** An invalid blog **/
  it('repsond with bad request status', function(done) {
    let blog ={"title":"blogOne"};
    request(app)
      .post('/api/blogs')
      .send(blog)
      .set('Accept', 'json')
      .expect(400, done);
  });
});
