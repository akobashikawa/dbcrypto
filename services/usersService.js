const usersService = {

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
                    resolve({ rows: rows });
                }
            });
        });
    },

    findAll() {
        var sql = "select * from Users";
        var params = [];
        return this.query(sql, params);
    },
};

module.exports = usersService;