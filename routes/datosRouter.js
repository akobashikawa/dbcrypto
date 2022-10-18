const express = require('express');
const router = express.Router();

const dbRepository = require('../domain/repositories/sqlite3Repository').create('from datos');
const datosDatabase = require('../domain/services/datosDatabaseSqlite3').create({
  dbRepository
});
const datosService = require('../domain/services/datosService').create({
  datosDatabase
});
const datosController = require('../controllers/datosController').create({
  datosService
});

router.get('/', datosController.findAll());
router.get('/:id', datosController.find());
router.post('/', datosController.add());
router.put('/:id', datosController.update());
router.delete('/:id', datosController.delete());

module.exports = router;
