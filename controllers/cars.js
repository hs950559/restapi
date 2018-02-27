const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async (req, res, next) => {
        console.log("HEERRE")
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    create: async (req, res, next) => {
        const user = await User.findById(req.body.seller);
        const newCar = req.body;
        delete newCar.seller;

        const car = new Car(newCar);
        car.seller = user;
        await car.save();

        user.cars.push(car);
        await user.save();

    	res.status(201).json(car);
    },

    getCar: async (req, res, next) => {
        const { carId } = req.params;
        const car = await Car.findById(carId);
    	res.status(200).json(car);
    },

    updateCar: async (req, res, next) => { 
        const { carId } = req.params;
        const newCar = req.body;
        const car = await Car.findByIdAndUpdate(carId, newCar);
    	res.status(200).json(car);
    },

    removeCar: async (req, res, next) => {
        const { carId } = req.params;
        const car = await Car.findById(carId);

        if(!car){
            return res.status(404).json({
                error: 'Car doesn\'t exist'
            });
        }

        const sellerId = car.seller;
        const user = await User.findById(sellerId);
        await car.remove();

        user.cars.pull(car);
        await user.save();
    	res.status(200).json({});
    }
};