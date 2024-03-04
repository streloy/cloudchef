require('dotenv').config();
const mongoose = require('mongoose');
//const dburi = "mongodb://localhost:27017/cloudechef";

const connectToMongo = ()=> {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.CONNECTION_STRING, ()=> {
        console.log("mongodb has been connected!");
    })
}

module.exports = connectToMongo;
