const db = require('../models/db_conf.js'); 


const id_user = 1; //voir session

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT t.*, c.nom AS nom_categorie, c.type AS type, co.nom AS nom_compte FROM transactions t JOIN categories c ON t.id_categorie = c.id_categorie JOIN comptes co ON t.id_compte = co.id_compte WHERE c.id_user="+id_user+";");
    return stmt_all.all(); 
};

module.exports.listRevenus = () => {
    const stmt_all = db.prepare("SELECT t.*, c.nom AS nom_categorie, c.type AS type, co.nom AS nom_compte FROM transactions t JOIN categories c ON t.id_categorie = c.id_categorie JOIN comptes co ON t.id_compte = co.id_compte WHERE c.type='r' AND c.id_user="+id_user+";");
    return stmt_all.all(); 
};

module.exports.listDepenses = () => {
    const stmt_all = db.prepare("SELECT t.*, c.nom AS nom_categorie, c.type AS type, co.nom AS nom_compte FROM transactions t JOIN categories c ON t.id_categorie = c.id_categorie JOIN comptes co ON t.id_compte = co.id_compte WHERE c.type='d' AND c.id_user="+id_user+";");
    return stmt_all.all(); 
};




