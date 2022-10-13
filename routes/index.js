const usersRouter = require('./usersRouter');
const datosRouter = require('./datosRouter');

const routers = (app) => {
    app.use('/api/users', usersRouter);
    app.use('/api/datos', datosRouter);
};

module.exports = routers;