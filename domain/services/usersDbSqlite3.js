const usersDbSqlite3 = {
    dbRepository: null,

    create({dbRepository}) {
        const obj = Object.create(this);
        obj.dbRepository = dbRepository;
        return obj;
    },

    findAll() {
        var sql = "select * from Users";
        var params = [];
        return this.dbRepository.query(sql, params);
    },

    findById(id) {
        const sql = `SELECT * FROM Users WHERE id=${id}`;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

    add(data) {
        const username = data.username;
        const publickey = data.publickey;
        const sql = `INSERT INTO Users
        (username, publickey)
        VALUES('${username}', '${publickey}');
        `;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

    update(id, data) {
        const username = data.username;
        const publickey = data.publickey;
        const sql = `UPDATE Users
        SET username='${username}', publickey='${publickey}'
        WHERE id=${id}
        `;
        const params = [];
        return this.dbRepository.query(sql, params);
    },

    delete(id) {
        const sql = `DELETE FROM Users
        WHERE id=${id}
        `;
        const params = [];
        return this.dbRepository.query(sql, params);
    },
};

module.exports = usersDbSqlite3;