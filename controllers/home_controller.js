const Post=require('../models/post');

module.exports.home= (req,res)=>{
   // console.log(req.cookies);
//    Post.find({})
//    .then(posts=>{
//     return res.render('home.ejs',{
//         title:"Besocial home",
//         Posts:posts
//     });
//    })

    //user of Posts to populated
   Post.find({}).populate('user')
   .then(posts=>{
    return res.render('home',{
        title:"Home",
        posts:posts
    });
})

}
