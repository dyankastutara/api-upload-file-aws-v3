'use strict';

require('dotenv').config();
const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(`Route ini tidak tersedia`);
});

module.exports = {
  upload : require('./uploads'),
  index: router
};
