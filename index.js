const express=require('express');
const cookieParser= require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
const session= require('express-session');
const passport= require('passport');
const passportLocal= require("./config/passport-local-startegy")
const MongoStore= require('connect-mongo');
const sassMiddleware=require('node-sass-middleware')


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());

//middleware for static files
app.use(express.static("./assets"));

app.use(expressLayouts);

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'besocial',
    //todo
    secret: "soemthing",
    saveUninitialized:false,
    resave: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://0.0.0.0/besocial_development' }),
    cookie:{
        maxAge:(1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes')); //by default fetches index.js



app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`); //`is bacticks used for interpolation
    }
    console.log(`Server is running on the port : ${port}`);

});