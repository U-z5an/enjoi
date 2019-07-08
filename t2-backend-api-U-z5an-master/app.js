const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const multer=require('multer');
const morgan=require('morgan');
const fs= require('fs');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('./DB/database');
app.use(express.static('./images'));

const userRoute=require('./Routes/user');
app.use('/users',userRoute);
const packageRoute = require('./Routes/package')
app.use('/packages', packageRoute);

var server= app.listen(7777,function(){
    console.log("server has started")
})
module.exports=app;
