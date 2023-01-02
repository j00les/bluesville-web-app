if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('wopwop', PORT);
});

module.exports = app;
