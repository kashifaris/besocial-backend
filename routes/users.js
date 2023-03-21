const express=require('express');
const router=express.Router();

const usersControler= require('../controllers/users_controller');

router.get('/profile',usersControler.profile);
router.get('/login',usersControler.login);
router.get('/register',usersControler.signup);

router.post('/create',usersControler.create);


module.exports=router;