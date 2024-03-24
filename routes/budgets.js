var express = require('express');
var router = express.Router();

/* GET budgets page */
router.get('/', function(req, res, next) {
  res.render('./budgets/index.hbs');
});

module.exports = router;