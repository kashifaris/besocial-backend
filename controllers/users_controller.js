const User= require('../models/user');

module.exports.profile=(req,res)=>{
    res.render('userProfile',{
        title:"User Profile"
    });
}

module.exports.signup=(req,res)=>{
   return res.render('signup',{

    })
}

module.exports.login=(req,res)=>{
   return res.render('login',{
        
    })
}

//get the signup data
module.exports.create=(req,res)=>{
    if(req.body.password != req.body.Cpassword){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email})
    .then((user)=>{
        //if not alredy exist
        if(!user) {
            User.create(req.body)
            .then(result=>{
                return res.redirect('/users/login');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })

}

//sign_in and create a session
module.exports.createSession=(req, res)=>{
    return res.redirect('/');
}


module.exports.destroySession=(req,res)=>{
    req.logout((err)=>{
        if(err)
        return next(err);
    });
    return res.redirect('/');
}