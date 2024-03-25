var express = require('express');
var router = express.Router();

/* GET comptes page */
router.get('/', function(req, res, next) {
  res.render('./comptes/index.hbs');
});

module.exports = router;