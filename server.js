require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/DB');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const { logger, logEvents } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/counterRoutes'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoDBErrorsLog.log',
  );
});
