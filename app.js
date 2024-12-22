const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/index.routes");

const app = express();

app.use(express.json());
app.use(cors());

//all registered routes
app.use(routes);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome To My Blog API'});
});

//catch all route for invalid routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found', code: 404 });
});

module.exports = app;
