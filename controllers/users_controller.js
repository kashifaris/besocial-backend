const User= require('../models/user');

module.exports.profile=(req,res)=>{
    User.findById(req.params.id)
    .then((user)=>{
       return res.render('userProfile',{
            title:"User Profile",
            profile_user:user
        });
    })
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
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
}


module.exports.destroySession=(req,res)=>{
    req.logout((err)=>{
        if(err) return;
    });
    req.flash('success', 'logged out successfull');
    return res.redirect('/');
}

// module.exports.update= (req,res)=>{
//     console.log(req.body.email);
//     User.findOne({email: req.body.email})
//     .then((user)=>{
//         user.name=req.body.name,
//         user.password=req.body.password
//         user.save();
//         return res.redirect('back');
//     })
// }

module.exports.update= (req,res)=>{
    if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id,req.body)
    .then((user)=>{
        return res.redirect('back');
    })
    }
    else
    {
        return res.status(401).send('Unautherized');
    }
}