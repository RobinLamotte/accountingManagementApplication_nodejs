const db = require('../models/db_conf.js'); 

const id_user = 1; //voir session

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT c.* FROM main.categories c WHERE c.id_user="+id_user+";");
    return stmt_all.all(); 
};


