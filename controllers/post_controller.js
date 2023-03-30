const Post = require("../models/post")

module.exports.post=(req,res)=>{
    Post.create({
        content: req.body.content,
        //this is coming from de-serialiser
        user: req.user._id
    }
    )
    .then(result=>{
        return res.redirect('/');
    })
}