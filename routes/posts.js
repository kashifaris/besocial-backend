const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const commentController= require('../controllers/comments_controller')
const passport= require('passport');

router.post('/create',passport.checkAuthentication,postController.post);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);


module.exports=router;