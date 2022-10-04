const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './services/database.sqlite3';

const db = new sqlite3.Database(DBSOURCE, err => {
    if (err) {
        console.log(err.message);
        throw err;
    } else {
        console.log(`Connected to db ${DBSOURCE}`);
    }
});

module.exports = db;