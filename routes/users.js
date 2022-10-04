const express = require('express');
const router = express.Router();

const db = require('../services/databaseService');
const usersService = require('../services/usersService').create({
  db
});
const usersController = require('../controllers/usersController').create({
  usersService
});

router.get('/', usersController.findAll());

module.exports = router;
