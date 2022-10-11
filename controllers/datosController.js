const datosController = {

    datosService: null,

    create({
        datosService
    }) {
        const obj = Object.create(this);
        obj.datosService = datosService;
        return obj;
    },

    findAll() {
        return async (req, res, next) => {
            try {
                const result = await this.datosService.findAll();
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    },

    find() {
        return async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await this.datosService.findById(id);
                res.json(result[0]);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    },

    add() {
        return async(req, res, next) => {
            try {
                const data = req.body;
                const result = await this.datosService.add(data);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    },

    update() {
        return async(req, res, next) => {
            try {
                const id = req.params.id;
                const data = req.body;
                const result = await this.datosService.update(id, data);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    },

    delete() {
        return async(req, res, next) => {
            try {
                const id = req.params.id;
                const result = await this.datosService.delete(id);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    },
};

module.exports = datosController;