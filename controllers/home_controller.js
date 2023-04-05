const Post=require('../models/post');
const User= require('../models/user');
module.exports.home= async (req,res)=>{
   // console.log(req.cookies);
//    Post.find({})
//    .then(posts=>{
//     return res.render('home.ejs',{
//         title:"Besocial home",
//         Posts:posts
//     });
//    })

    //user of Posts to populated
    try
{   let posts= await Post.find({})
   .populate('user')
   .populate({
        path:'comments',
        populate: {
            path:'user'
        }
    });
   
   let user=await User.find({});
 
        return res.render('home',{
            title:"Home",
            posts:posts,
            all_users:user
        });}

        catch(err){
            console.log("Error",err);
            return;
        }

}
