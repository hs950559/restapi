const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');

router.route('/')
	.get(UsersController.index)
	.post(UsersController.create);

module.exports = router;