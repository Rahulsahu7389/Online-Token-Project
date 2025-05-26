const mongoose = require('mongoose');
const mongouri = process.env.MONGO_URI ;

mongoose.connect(mongouri).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("MongoDB connection failed");

})