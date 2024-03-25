var express = require('express');
var router = express.Router();

const Transaction = require("../models/Transaction.js");
const Categorie = require("../models/Categorie.js");

/* GET transactions listing. */
router.get('/', function(req, res, next) {

  const table_transactions_depenses = Transaction.listDepenses();
  const table_transactions_revenus = Transaction.listRevenus();

  res.render('transactions/index.hbs', { title: 'Express', table_transactions_depenses, table_transactions_revenus, categoriesR: Categorie.listR(), categoriesD: Categorie.listD()});
});

/* POST add new transaction. */
router.post('/add', function(req, res, next) {
  //Transaction.add(req.body.nom, req.body.type, req.body.montant_prevu, req.body.description);
  //montant
  //description
  //date
  //categorie
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log(req.body.date);
  console.log(req.body.date);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");


  res.redirect('/transactions');
});
 
module.exports = router;