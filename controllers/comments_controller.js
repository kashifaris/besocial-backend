const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID; 
const mongodb= require('mongodb');


module.exports.create = async function(req, res){
    //req.body coming from the form
    const id= (req.body.post).trim();
    console.log(mongoose.Types.ObjectId.isValid(id),id);
    
    try{
        
        let post = await Post.findById(id);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: (req.body.post).trim(),
                user: req.user._id
            });

            post.comments.push(comment);
            //to save changes in the database
            post.save();

            res.redirect('/');
        }
    }catch(err){
        console.log('ErrorX', err);
        return;
    }
    
}


module.exports.destroy= (req,res)=>{
    Comment.findById(req.params.id)
    .then((comment)=>{
        if(comment.user == req.user.id)
        {
            const postId=comment.post;
            Comment.deleteOne({_id:req.params.id})
            .then((x)=>{
            })
            Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}})
            .then((p)=>{
                return res.redirect('back');

            })
        }
    })
}