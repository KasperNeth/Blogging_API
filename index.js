const app = require('./app');
const dbConnection = require("./src/utils/Db");
require('dotenv').config();

dbConnection.connectToMongoDB();

const PORT = process.env.PORT 

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});

