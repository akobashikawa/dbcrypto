const usersService = {

    usersDatabase: null,

    create({
        usersDatabase
    }) {
        const obj = Object.create(this);
        obj.usersDatabase = usersDatabase;
        return obj;
    },

    findAll() {
        return this.usersDatabase.findAll();
    },

    findById(id) {
        return this.usersDatabase.findById(id);
    },

    add(data) {
        return this.usersDatabase.add(data);
    },

    update(id, data) {
        return this.usersDatabase.update(id, data);
    },

    delete(id) {
        return this.usersDatabase.delete(id);
    },
};

module.exports = usersService;