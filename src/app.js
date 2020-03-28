const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;