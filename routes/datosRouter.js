const express = require('express');
const router = express.Router();

const dbRepository = require('../domain/repositories/sqlite3Repository').create('from datos');
const datosDatabase = require('../domain/services/datosDbSqlite3').create({
  dbRepository
});
const datosService = require('../domain/services/datosService').create({
  datosDatabase
});
const datosController = require('../controllers/datosController').create({
  datosService
});

router.get('/', datosController.findAll());

module.exports = router;
