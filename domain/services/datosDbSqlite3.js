const sqlite3Service = {
    db: null,

    create({db}) {
        const obj = Object.create(this);
        obj.db = db;
        return obj;
    },

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    findAll() {
        var sql = `SELECT d.id, u.username, d.publico, d.privado
        FROM Datos d
        JOIN Users u
        WHERE d.userId = u.id`;
        var params = [];
        return this.query(sql, params);
    },
/*
    findById(id) {
        const sql = `SELECT * FROM Users WHERE id=${id}`;
        const params = [];
        return this.query(sql, params);
    },

    add(data) {
        const username = data.username;
        const publickey = data.publickey;
        const sql = `INSERT INTO Users
        (username, publickey)
        VALUES('${username}', '${publickey}');
        `;
        const params = [];
        return this.query(sql, params);
    },

    update(id, data) {
        const username = data.username;
        const publickey = data.publickey;
        const sql = `UPDATE Users
        SET username='${username}', publickey='${publickey}'
        WHERE id=${id}
        `;
        const params = [];
        return this.query(sql, params);
    },

    delete(id) {
        const sql = `DELETE FROM Users
        WHERE id=${id}
        `;
        const params = [];
        return this.query(sql, params);
    },
    */
};

module.exports = sqlite3Service;