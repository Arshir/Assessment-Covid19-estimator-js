// import express module
const express = require('express');
// import body parser
const bodyParser = require('body-parser');
// import xml parser
const xml = require('xml2js');
// import estimator method
const estimator = require('./estimator.js');

const builder = new xml.Builder({
  renderOpts: { pretty: false }
});

const app = express();

const port = 3018;

app.use(bodyParser.json());

app.post('/api/v1/on-covid-19/:format?', (req, res) => {
  const data = req.body;
  const output = estimator.covid19ImpactEstimator(data);
  console.log(req.params.format);
  const result = req.params.format === 'xml' ? builder.buildObject(output) : output;
  res.send(result);
});

// Start app to listen on the port
app.listen(port);
