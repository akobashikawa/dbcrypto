const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = './domain/repositories/database.sqlite3';

const sqlite3Repository = {
    db: null,

    create() {
        if (this.db == null) {
            this.db = new sqlite3.Database(DBSOURCE, err => {
                if (err) {
                    console.log(err.message);
                    throw err;
                } else {
                    console.log(`Connected to db ${DBSOURCE}`);
                }
            });
        }
        return this;
    },

    getDb() {
        return this.db;
    }
};

module.exports = sqlite3Repository;