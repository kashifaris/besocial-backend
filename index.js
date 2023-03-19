const express=require('express');
const app=express();
const port=8000;

//use express router
app.use('/',require('./routes')) //by default fetches index.js

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`); //`is bacticks used for interpolation
    }
    console.log(`Server is running on the port : ${port}`);

});