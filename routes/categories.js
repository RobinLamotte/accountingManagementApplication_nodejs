var express = require('express');
var router = express.Router();

/* GET categories page. */
router.get('/', function(req, res, next) {
  res.render('categories/index.hbs');
});

/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('categories/add.hbs');
});

module.exports = router;