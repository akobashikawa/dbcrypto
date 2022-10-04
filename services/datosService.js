const personasService = {

    db: null,

    create({
        db
    }) {
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
};

module.exports = personasService;