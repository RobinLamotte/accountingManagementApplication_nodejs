const db = require('../models/db_conf.js'); 


const id_user = 1; //voir session

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT t.* FROM main.transactions t, main.comptes c WHERE t.id_compte=c.id_compte AND c.id_user="+id_user+";");
    return stmt_all.all(); 
};


