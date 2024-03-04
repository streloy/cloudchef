require('dotenv').config();
const express = require('express');
const uploadRouter = require('./api/upload/upload.router');
const connectToMongo = require('./config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
});

//Route all api
app.use( process.env.APP_VERSION + 'upload', uploadRouter);

app.get('/', (req, res)=> {
    res.status(200).json({
        "success": 1,
        "message": "Welcome to CloudChef Test Api"
    });
});

connectToMongo();

// Uploaded file location
app.use('/files', express.static('upload/'));

app.get('*', function(req, res){
    res.status(404).json({
        "success": 0,
        "message": "Page not found from system"
    });
});


app.listen(process.env.APP_PORT, ()=> {
    console.log("Node server start with PORT: " + process.env.APP_PORT);
}).on('error', (err)=>{
    console.log(err);
});