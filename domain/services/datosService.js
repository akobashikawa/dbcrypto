const datosService = {

    datosDatabase: null,

    create({
        datosDatabase
    }) {
        const obj = Object.create(this);
        obj.datosDatabase = datosDatabase;
        return obj;
    },

    findAll() {
        return this.datosDatabase.findAll();
    },

    findById(id) {
        return this.datosDatabase.findById(id);
    },

    add(data) {
        return this.datosDatabase.add(data);
    },

    update(id, data) {
        return this.datosDatabase.update(id, data);
    },

    delete(id) {
        return this.datosDatabase.delete(id);
    },
};

module.exports = datosService;