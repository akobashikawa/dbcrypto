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
};

module.exports = datosController;