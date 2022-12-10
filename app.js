const express = require('express');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// const NotFoundError = require('./errors/NotFoundError');
const { errorHandler } = require('./midllewars/errorHandler');
const { requestLogger, errorLogger } = require('./midllewars/logger');
const router = require('./routers/index');
const { cors } = require('./midllewars/cors');
const limiter = require('./midllewars/limiter');
const { MONGO_DB_DEFAULT } = require('./utils/config');

const { PORT = 3001, MONGO_DB = MONGO_DB_DEFAULT } = process.env;
const app = express();
app.use(express.json());
mongoose.connect(MONGO_DB);

app.use(cookieParser());
app.use(helmet());
console.log('ghsjkd');

app.use(requestLogger);
app.use(cors);
app.use(limiter);
app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`сервер запущен, порт ${PORT}`);
});
