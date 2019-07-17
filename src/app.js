import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { auth, secured } from './controllers';

const app = express();


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Protect Headers
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));


// Cors
app.use(cors());

// express routing config

app.use('/api/v1/', secured);
app.use('/api/v1/auth/', auth);


// welcome message for root directory
app.all('/', (req, res) => {
  res.status(200).json('Welcome to WayFarer API');
  // res.send('Welcome to WayFarer API');
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
