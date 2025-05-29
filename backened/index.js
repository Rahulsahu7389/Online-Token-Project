const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Prod = require('./Middlewares/ProductRouter.js');//importing the product router
require('dotenv').config();
//now create env file
const AuthRouter = require('./Routes/AuthRouter.js');//importing the auth router

//mongoDB connection
require('./Models/db.js');

const PORT = process.env.PORT || 8080;

app.use(cors());//allow cross-origin requests
app.use(bodyParser.json());//parse json data
app.use('/products',Prod)//use the product router for all routes starting with /products
app.use('/auth', AuthRouter);//use the auth router for all routes starting with /auth


app.get('/ping', (req, res) => {
  res.send('Hello World!');//just to check if the server is running
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
