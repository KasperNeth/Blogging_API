const express  = require("express");
const cors = require("cors");
const dbConnection = require("./utils/Db");
const routes = require("./routes/index.routes")
const globalErrorHandler = require("./middlewares/errorhandling.middleware")
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cors())
app.use(globalErrorHandler);
dbConnection.connectToMongoDB();



//all registered routes
app.use(routes);

app.get('*', (req, res) => {
    res.json({ message: 'Route not found', code: 404 })
})


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})