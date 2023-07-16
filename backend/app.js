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
const allowCors = [
  '127.0.0.1:3000',
  'localhost:3000',
  'http://api.exir74.nomoredomains.xyz',
  'https://api.exir74.nomoredomains.xyz'
]


const app = express();
app.use(function (req, res, next){
  const {origin} = req.headers;
  if (allowCors.includes(origin)){
    res.header('Access-Control-Allow-Origin', origin);
  }
  next()
})
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
