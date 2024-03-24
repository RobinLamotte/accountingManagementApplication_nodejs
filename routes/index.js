var express = require('express');
var router = express.Router();

const Transaction = require("../models/Transaction.js");
const Categorie = require("../models/Categorie.js");
 
/* GET home page. */
router.get('/', function(req, res, next) {
  const table_transactions = Transaction.list();
  const table_categories = Categorie.list();

  console.table(table_transactions);
  console.table(table_categories);

  res.render('index.hbs', { title: 'Express', table_transactions, table_categories });
});

module.exports = router;
