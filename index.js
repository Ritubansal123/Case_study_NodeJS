var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const routes = require('./routers/router')

//set the port for api calls
const PORT = 5000;

app.use(bodyParser.json({
  limit: '50mb',
  extended: true
}));


app.use('/', routes);
app.use('/router', routes);


app.get('/', (_req, res) => {
  console.log("res");
  res.send("API started")
})
   
//Start listening the port
app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));