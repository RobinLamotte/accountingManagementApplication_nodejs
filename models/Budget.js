const db = require('../models/db_conf.js'); 

const id_user = 1; //voir session
const dic_mois = {
    1: "Janvier",
    2: "Février",
    3: "Mars",
    4: "Avril",
    5: "Mai",
    6: "Juin",
    7: "Juillet",
    8: "Août",
    9: "Septembre",
    10: "Octobre",
    11: "Novembre",
    12: "Décembre"};

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT b.annee, b.mois, SUM(CASE WHEN c.type = 'd' THEN t.montant ELSE 0 END) AS total_depenses, SUM(CASE WHEN c.type = 'r' THEN t.montant ELSE 0 END) AS total_revenus, (SELECT SUM(montant_prevu) FROM budget_du_mois_par_categories WHERE id_categorie IN (SELECT id_categorie FROM categories WHERE id_user = "+id_user+" AND type = 'd') AND annee = b.annee AND mois = b.mois) AS total_depenses_prevues, (SELECT SUM(montant_prevu) FROM budget_du_mois_par_categories WHERE id_categorie IN (SELECT id_categorie FROM categories WHERE id_user = 1 AND type = 'r') AND annee = b.annee AND mois = b.mois) AS total_revenus_prevus FROM budget_du_mois_par_categories b JOIN categories c ON b.id_categorie = c.id_categorie LEFT JOIN transactions t ON b.id_categorie = t.id_categorie AND b.mois = t.id_mois AND b.annee = t.id_annee WHERE c.id_user = "+id_user+" GROUP BY b.annee, b.mois ORDER BY b.annee DESC, b.mois DESC;");
    const table_budgets = stmt_all.all(); 

    for (const budget of table_budgets){
        budget.mois_string = dic_mois[budget.mois];
    }
    return table_budgets;

};

module.exports.addOne = (id_categorie, mois, annee, montant_prevu, commentaire) => {
    const stmt_insert = db.prepare("INSERT INTO budget_du_mois_par_categories (id_categorie, mois, annee, montant_prevu, commentaires) VALUES (?, ?, ?, ?, ?)")
    return stmt_insert.run(id_categorie, mois, annee, montant_prevu, commentaire)
}

module.exports.add = () => {
    //pour chaque catégorie cochée:
    //this.addOne(...);
}

module.exports.details = (mois, annee) => {
    const stmt_all = db.prepare("SELECT c.id_categorie, c.nom,c.type, b.mois, b.annee, b.montant_prevu, b.commentaires, SUM(t.montant) AS somme_montants FROM categories c JOIN budget_du_mois_par_categories b ON c.id_categorie = b.id_categorie LEFT JOIN transactions t ON c.id_categorie = t.id_categorie AND b.mois = t.id_mois AND b.annee = t.id_annee WHERE b.mois="+mois+" AND b.annee="+annee+" AND c.id_user="+id_user+" GROUP BY c.id_categorie, c.nom;");
    const table_details = stmt_all.all();


    for (const budget of table_details){
        budget.mois_string = dic_mois[budget.mois].toLowerCase();
        if (budget.type === 'd'){
          budget.type_string = "Dépense";
        }
        else if (budget.type === 'r'){
          budget.type_string = "Revenu";
        }
    }
    return table_details;
}

