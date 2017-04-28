/**
 * Express configuration
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./environment');
const mongoose = require('mongoose');

module.exports = function(app) {
  let env = app.get('env');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());  
};