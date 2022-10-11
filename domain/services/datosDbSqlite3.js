const datosDbSqlite3 = {
    dbRepository: null,

    create({dbRepository}) {
        const obj = Object.create(this);
        obj.dbRepository = dbRepository;
        return obj;
    },

    findAll() {
        var sql = `SELECT d.id, u.username, d.publico, d.privado
        FROM Datos d
        JOIN Users u
        WHERE d.userId = u.id`;
        var params = [];
        return this.dbRepository.query(sql, params);
    },

};

module.exports = datosDbSqlite3;