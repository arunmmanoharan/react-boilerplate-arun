const express = require('express');
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// GET http://localhost:8080/api
router.get('/api/colors', function(req, res) {
  console.log('here');
  res.json({ message: 'hooray! welcome to our api!' });
});

module.exports = router;
