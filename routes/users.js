const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');

router.route('/')
	.get(UsersController.index)
	.post(UsersController.create);

router.route('/:userId')
	.get(UsersController.getUser)
	.put(UsersController.updateUser)
	.patch(UsersController.updateUser);

router.route('/:userId/cars')
	.get(UsersController.getUserCars)
	.post(UsersController.createUserCars);

module.exports = router;