const express = require('express');
const router = express.Router();

const dbRepository = require('../domain/repositories/sqlite3Repository').create('from personas');
const personasDatabase = require('../domain/services/personasDbSqlite3').create({
  db: dbRepository.getDb()
});
const personasService = require('../domain/services/personasService').create({
  personasDatabase
});
const personasController = require('../controllers/personasController').create({
  personasService
});

router.get('/', personasController.findAll());

module.exports = router;
