require('dotenv').config();
const path = require('path');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

const router = require('./routes');

app.use(router);

const PORT = process.env.PORT ?? 4000;
const SERVER_HOST = process.env.SERVER_HOST ?? 'localhost';
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://${SERVER_HOST}:${PORT}`);
});
