const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID; 
const mongodb= require('mongodb');


module.exports.create = async function(req, res){
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
            post.save();

            res.redirect('/');
        }
    }catch(err){
        console.log('ErrorX', err);
        return;
    }
    
}