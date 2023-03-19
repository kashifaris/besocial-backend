const express=require('express');
const router=express.Router();

const usersControler= require('../controllers/users_controller');

router.get('/profile',usersControler.profile);


module.exports=router;