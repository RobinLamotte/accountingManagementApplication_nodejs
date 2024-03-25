var express = require('express');
var router = express.Router();

const Categorie = require("../models/Categorie.js");


/* GET categories page. */
router.get('/', function(req, res, next) {
  const table_categories = Categorie.list();
  console.table(table_categories);
  for (const categorie of table_categories){
    if (categorie.type === 'd'){
      categorie.type = "Dépense";
    }
    else if (categorie.type === 'r'){
      categorie.type = "Revenu";
    }
  }
  console.table(table_categories);
  res.render('categories/index.hbs',  {table_categories});
});

/* POST add new categorie. */
router.post('/add', function(req, res, next) {
  Categorie.add(req.body.nom, req.body.type, req.body.montant_prevu, req.body.description);
  res.redirect('/categories');
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  const table_categories = Categorie.list();
  res.render('categories/test.hbs',  {table_categories});
});

/* GET update page. */
router.get('/update', function(req, res, next) {
  const categorie = Categorie.getById(req.query.id_categorie);
  res.render('categories/update.hbs', {categorie});
});

/* POST update categorie. */
router.post('/update', function(req, res, next) {
  Categorie.update(req.body.nom, req.body.montant_prevu, req.body.description, req.body.id_categorie);
  res.redirect('/categories');
});



module.exports = router;