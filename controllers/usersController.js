const usersController = {

    usersService: null,
    cryptoService: null,

    create({
        usersService,
        cryptoService
    }) {
        const obj = Object.create(this);
        obj.usersService = usersService;
        obj.cryptoService = cryptoService;
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

    find() {
        return async (req, res, next) => {
            try {
                const id = req.params.id;
                const result = await this.usersService.findById(id);
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
                const result = await this.usersService.add(data);
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
                const result = await this.usersService.update(id, data);
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
                const result = await this.usersService.delete(id);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    },

    updateKeys() {
        return async(req, res, next) => {
            try {
                const id = req.params.id;
                const data = req.body;
                const { publicKey, privateKey } = this.cryptoService.generateKeys();
                data.publickey = publicKey;
                data.privatekey = privateKey;
                const result = await this.usersService.update(id, data);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message: error.message
                });
            }
        };
    }
};

module.exports = usersController;