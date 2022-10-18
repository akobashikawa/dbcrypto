const express = require('express');
const router = express.Router();

const dbRepository = require('../domain/repositories/sqlite3Repository').create();
const usersDatabase = require('../domain/services/usersDatabaseSqlite3').create({
  dbRepository
});
const usersService = require('../domain/services/usersService').create({
  usersDatabase
});
const usersController = require('../controllers/usersController').create({
  usersService
});

router.get('/', usersController.findAll());
router.get('/:id', usersController.find());
router.post('/', usersController.add());
router.put('/:id', usersController.update());
router.delete('/:id', usersController.delete());

module.exports = router;
