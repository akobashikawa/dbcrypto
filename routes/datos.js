const express = require('express');
const router = express.Router();

const db = require('../services/databaseService');
const datosService = require('../services/datosService').create({
  db
});
const datosController = require('../controllers/datosController').create({
  datosService
});

router.get('/', datosController.findAll());

module.exports = router;
