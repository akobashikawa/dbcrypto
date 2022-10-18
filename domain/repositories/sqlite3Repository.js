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
    },

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(rows);
                    resolve(rows);
                }
            });
        });
    },

    run(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    console.log({rows});
                    resolve(rows);
                }
            });
        });
    },
};

module.exports = sqlite3Repository;