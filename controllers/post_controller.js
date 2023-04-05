const Post = require("../models/post");
const Comment = require('../models/comment');

module.exports.post= async(req,res)=>{
    try
   { await Post.create({
        content: req.body.content,
        //this is coming from de-serialiser
        user: req.user._id
    }
    );
    req.flash('success','post created')
    return res.redirect('/');
}
catch(err){
    console.log('Error',err);
    return;
}
}

module.exports.destroy = async(req,res)=>{
try{
   let post= await Post.findById(req.params.id)
    //.id means mongoose converting the _id to string
   if(post.user == req.user.id)
   {
      await Post.deleteOne({_id:req.params.id})


      await Comment.deleteMany({post:req.params.id})

      req.flash('error','post and related comment deleted')

           return res.redirect('back');
      
   }
   else{
       return res.redirect('back');
   }
}
catch(err)
{
    console.log('error',err);
    return;
}

}


