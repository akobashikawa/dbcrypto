const personasService = {

    personasDatabase: null,

    create({
        personasDatabase
    }) {
        const obj = Object.create(this);
        obj.personasDatabase = personasDatabase;
        return obj;
    },

    findAll() {
        return this.personasDatabase.findAll();
    },

    findById(id) {
        return this.personasDatabase.findById(id);
    },

    add(data) {
        return this.personasDatabase.add(data);
    },

    update(id, data) {
        return this.personasDatabase.update(id, data);
    },

    delete(id) {
        return this.personasDatabase.delete(id);
    },
};

module.exports = personasService;