const personasController = {

    personasService: null,

    create({
        personasService
    }) {
        const obj = Object.create(this);
        obj.personasService = personasService;
        return obj;
    },

    findAll() {
        return async (req, res, next) => {
            try {
                const result = await this.personasService.findAll();
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

module.exports = personasController;