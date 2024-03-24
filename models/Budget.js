const db = require('../models/db_conf.js'); 

const id_user = 1; //voir session

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT t.id_transaction, t.montant, t.description, t.date, b.id_budget, b.nom, c.nom, c.type FROM transactions t,  budget b, categories c, users u WHERE t.id_budget = b.id_budget AND t.id_categorie = c.id_categorie AND b.id_user = u.id_user;");
    return stmt_all.all(); 
};




//"SELECT b.id_categorie, b.mois, b.annee, b.montant_prevu, b.commentaires, SUM(t.montant) AS somme_transactions FROM budget_du_mois_par_categories AS b LEFT JOIN transactions AS t ON b.id_categorie = t.id_categorie AND b.mois = t.id_mois AND b.annee = t.id_annee GROUP BY b.id_categorie, b.mois, b.annee, b.montant_prevu, b.commentaires;



