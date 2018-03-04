const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/APIAuthenticationTEST', { useMongoClient: true });
} else {
  // mongoose.connect('mongodb://localhost/APIAuthentication', { useMongoClient: true });
  mongoose.connect('mongodb://hemant:123@ds255768.mlab.com:55768/apiauth', { useMongoClient: true });
}

const app = express();
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Use Routes
app.use('/users', require('./routes/users'));

// Global Error Handling
// Catch 404 errors and forword them to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use((err, req, res, next) => {
	const error = app.get('env') === 'dev' ? err : {};
	const status = error.status || 500;

	res.status(status).json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
