const usersRouter = require('./usersRouter');
const personasRouter = require('./personasRouter');
const datosRouter = require('./datosRouter');

const routers = (app) => {
    app.use('/api/users', usersRouter);
    app.use('/api/personas', personasRouter);
    app.use('/api/datos', datosRouter);
};

module.exports = routers;