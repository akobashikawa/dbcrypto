const usersController = {

    usersService: null,

    create({
        usersService
    }) {
        const obj = Object.create(this);
        obj.usersService = usersService;
        return obj;
    },

    findAll() {
        return async (req, res, next) => {
            try {
                const result = await this.usersService.findAll();
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

module.exports = usersController;