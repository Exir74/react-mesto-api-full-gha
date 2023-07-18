const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./errors/errorHandler');
const routes = require('./routes/index');
const { URL, PORT } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors')
const allowedCors = [
  'https://exir74.nomoredomains.xyz',
  'http://exir74.nomoredomains.xyz',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  '127.0.0.1:3000',
  'localhost:3000',
  'exir74.nomoredomains.xyz',
];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const app = express();

app.use(cors(
  {
    origin: allowedCors,
    credentials: true
  }))

// app.use(function(req, res, next) {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//   }
//
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   next();
// });

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(URL)
  .then(() => console.log(`db connected on ${URL}`))
  .catch((err) => console.log(`Ошибка подключения к БД: ${err.name}`));

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Сервер запущен порт: ${PORT}...`);
    });
  } catch (err) {
    console.log(err.name);
  }
};
startServer();
