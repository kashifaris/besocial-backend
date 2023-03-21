const express=require('express');
const cookieParser= require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

//app.use(expressLayouts);
//use express router
app.use('/',require('./routes')) //by default fetches index.js

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`); //`is bacticks used for interpolation
    }
    console.log(`Server is running on the port : ${port}`);

});