require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const {initialize} = require('./controllers/integration-controller');
const { createTunnel } = require('./helpers/tunnel');

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(routes);
app.listen(port, () => {
  createTunnel(port);
  try {
    initialize();   
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = app;
