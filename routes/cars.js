const router = require('express-promise-router')();
const CarsController = require('../controllers/cars');

router.route('/')
	.get(CarsController.index)
	.post(CarsController.create);

router.route('/:carId')
	.get(CarsController.getCar)
	.put(CarsController.updateCar)
	.patch(CarsController.updateCar)
	.delete(CarsController.removeCar);

module.exports = router;