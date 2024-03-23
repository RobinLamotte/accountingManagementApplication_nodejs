const db = require('better-sqlite3')('C:/Users/robin/Documents/workspace/accountingManagementApplication_nodejs/database/data.sqlite', { verbose: console.log });

module.exports = db;

