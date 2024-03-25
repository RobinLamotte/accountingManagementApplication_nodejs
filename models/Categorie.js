const db = require('../models/db_conf.js'); 

const id_user = 1; //voir session

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT c.*, SUM(t.montant) AS montant_total, AVG(t.montant) AS moyenne_par_categorie FROM categories c LEFT JOIN transactions t ON c.id_categorie = t.id_categorie LEFT JOIN budget_du_mois_par_categories bmc ON t.id_categorie = bmc.id_categorie AND t.id_mois = bmc.mois AND t.id_annee=bmc.annee WHERE c.id_user="+id_user+" GROUP BY c.id_categorie, c.nom, c.type;");
    return stmt_all.all(); 
};

module.exports.listR = () => {
    const stmt_all = db.prepare("SELECT c.* FROM categories c WHERE c.type='r' AND c.id_user="+id_user+";");
    return stmt_all.all(); 
};

module.exports.listD = () => {
    const stmt_all = db.prepare("SELECT c.* FROM categories c WHERE c.type='d' AND c.id_user="+id_user+";");
    return stmt_all.all(); 
};

module.exports.getById = (id) => {
    const stmt_get = db.prepare("SELECT * FROM categories WHERE id_categorie="+id+" AND id_user="+id_user+";");
    return stmt_get.get(); 
};

module.exports.update = (nom, montant_prevu, description, id_categorie) => {
    const stmt_insert = db.prepare("UPDATE categories SET nom=?, montant_prevu=?, description=? WHERE id_categorie= ? ");
    return stmt_insert.run(nom, montant_prevu, description, id_categorie); 
    //const stmt_insert = db.prepare("UPDATE categories SET nom='kamooooulox', montant_prevu=35, description='test' WHERE id_categorie= 11 ");
    //return stmt_insert.run(); 
};

module.exports.add = (nom, type, montant_prevu, description) => {
    const stmt_insert = db.prepare("INSERT INTO categories (nom, type, montant_prevu, description, id_user) VALUES (?, ?, ?, ?, ?);");
    return stmt_insert.run(nom, type, montant_prevu, description, id_user); 
};


