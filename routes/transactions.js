var express = require('express');
var router = express.Router();

const Transaction = require("../models/Transaction.js");

/* GET transactions listing. */
router.get('/', function(req, res, next) {

  const table_transactions = Transaction.list();
  console.table(table_transactions);
  res.render('transactions/index.hbs', { title: 'Express', table_transactions });
});
 
module.exports = router;