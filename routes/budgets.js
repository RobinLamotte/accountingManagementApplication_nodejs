var express = require('express');
var router = express.Router();

const Budget = require("../models/Budget.js");

/* GET budgets page */
router.get('/', function(req, res, next) {
  const table_budgets = Budget.list();


  console.table(table_budgets);
  res.render('./budgets/index.hbs', {table_budgets});
});

/*GET details budget page */
router.get('/details', function(req, res, next) {
  const table_details = Budget.details(req.query.mois, req.query.annee);
  console.table(table_details);
  res.render('./budgets/details.hbs', {table_details, mois: table_details[0].mois_string, annee: table_details[0].annee});
});

module.exports = router;