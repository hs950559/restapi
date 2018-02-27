const express = require('express');
const logger = require('morgan');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mydb');

const app = express();

// Routes
const users = require('./routes/users');
const cars = require('./routes/cars');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/users', users);
app.use('/api/cars', cars);

// Catch 404 errors and forword them to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use((err, req, res, next) => {
	const error = app.get('env') === 'development' ? err : {};
	const status = error.status || 500;

	res.status(status).json({
		error: {
			message: error.message
		}
	});
});

app.get('/', (req, res) => {
	res.json({name: "koool"});
});

app.listen(port, ()=>{
	console.log("Server Running http://localhost:"+port );
});

