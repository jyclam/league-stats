const express = require('express');
const logger = require('morgan');


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', (req,res) => {
  res.json({'hello': 'world'});
})

module.exports = app;
