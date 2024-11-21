const express = require('express');

const infoCardsRouter = require('./Routers/infoCardsRouter');
const userRouter = require('./Routers/userRouter');
const imageRouter = require('./Routers/imageRouter');

const app = express();
const cors = require('cors');
const path = require('path');

const globalErrorHandler = require('./Controllers/globalErrorController');
const AppError = require('./utils/AppError');

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/medical_analysis/infoCards', infoCardsRouter);
app.use('/medical_analysis/user', userRouter);
app.use('/medical_analysis/image', imageRouter);

app.use((req, res, next) => {
  const message = req.originalUrl;
  return next(
    new AppError(`couldn't able to find route ${message}`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
