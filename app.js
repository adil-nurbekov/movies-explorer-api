require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');

const { PORT = 3000 } = process.env;
const { BD_URL = 'mongodb://localhost:27017/moviesbd' } = process.env;

const app = express();

app.use(helmet.hidePoweredBy());

app.use(cors());

app.use(express.json());

mongoose.connect(`${BD_URL}`, {
  useNewUrlParser: true,
});

app.use(requestLogger); // REQUEST LOGGER

router.use(rateLimiter); // REQUEST LIMITER

app.use('/', router); // ALL REQUESTS

app.use(errorLogger); // LOGGER ERRORS

app.use(errors()); // CELEBRATE ERRORS

app.use(errorHandler); // CENTRAL ERROR HANDLER

app.listen(PORT, () => console.log(`Server has been stated on ${PORT}`));
