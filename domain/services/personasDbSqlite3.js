const personasDbSqlite3 = {
    dbRepository: null,

    create({dbRepository}) {
        const obj = Object.create(this);
        obj.dbRepository = dbRepository;
        return obj;
    },

    findAll() {
        var sql = `SELECT p.id, u.username, p.nombre, p.secreto
        FROM Personas p
        JOIN Users u
        WHERE p.userId = u.id`;
        var params = [];
        return this.dbRepository.query(sql, params);
    },

};

module.exports = personasDbSqlite3;