const datosDbSqlite3 = {
    dbRepository: null,

    create({dbRepository}) {
        const obj = Object.create(this);
        obj.dbRepository = dbRepository;
        return obj;
    },

    findAll() {
        var sql = `SELECT id,
        userId, (SELECT u.username FROM Users u WHERE userId=u.id) user,
        toUserId, (SELECT u.username FROM Users u WHERE toUserId=u.id) toUser,
        publico, privado 
        FROM Datos`;
        var params = [];
        return this.dbRepository.query(sql, params);
    },

    findById(id) {
        const sql = `SELECT * FROM Datos WHERE id=${id}`;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

    add(data) {
        const entries = Object.entries(data)
            .filter(item => (item[0] != 'id') && item[1]);
        // construye lista de columnas a partir de la data
        const listColumns = entries
            .map(item => `${item[0]}`)
            .join(', ');
        // construye lista de valores a partir de la data
        const listValues = entries
            .map(item => isNaN(item[1]) ? `'${item[1]}'` : item[1])
            .join(', '); 
        const sql = `INSERT INTO Datos
        (${listColumns})
        VALUES(${listValues});
        `;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

    update(id, data) {
        // construye la lista de asignaciones a partir de la data
        const listColumnValues = Object.entries(data)
            .filter(item => (item[0] != 'id') && item[1])
            .map(item => isNaN(item[1]) ? `${item[0]}='${item[1]}'` : `${item[0]}=${item[1]}`)
            .join(', ');
        const sql = `UPDATE Datos SET ${listColumnValues} WHERE id=${id}`;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

    delete(id) {
        const sql = `DELETE FROM Datos
        WHERE id=${id}
        `;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

};

module.exports = datosDbSqlite3;