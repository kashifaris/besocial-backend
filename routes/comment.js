const express = require('express');
const router = express.Router();
const commentController= require('../controllers/comments_controller')
const passport= require('passport');

router.post('/add',passport.checkAuthentication,commentController.create);



module.exports=router;