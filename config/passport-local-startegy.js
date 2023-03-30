const passport = require('passport');

const LocalStrategy= require("passport-local").Strategy;

const User = require('../models/user')

passport.use(new LocalStrategy({
    usernameField: 'email'
},
(email,password,done)=>{
    User.findOne({email:email})
    .then((user)=>{
        if(!user || user.password != password)
        {
            console.log('invalid username/password');
            return done(null,false);
        }
        console.log(user);
        return  done(null,user);
    })
}
));


//serialize putting it into cookie
passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = (req,res,next)=>{
    //if logedin then pass to next which is controllers action
    if(req.isAuthenticated()){
        return next();
    }
    //if not 
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser= (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

passport.checkloggedin = (req,res,next)=>{
    //if logedin then pass to next which is controllers action
    if(!req.isAuthenticated()){
        return next();
    }
    //if not 
    return res.redirect('/users/login');
}

module.exports =passport;