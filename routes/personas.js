const express = require('express');
const router = express.Router();

const db = require('../services/databaseService');
const personasService = require('../services/personasService').create({
  db
});
const personasController = require('../controllers/personasController').create({
  personasService
});

router.get('/', personasController.findAll());

module.exports = router;
