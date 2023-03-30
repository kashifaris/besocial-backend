const express=require('express');
const router=express.Router();
const passport= require('passport');

const usersControler= require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,usersControler.profile);
router.get('/login',passport.checkloggedin,usersControler.login);
router.get('/register',passport.checkloggedin,usersControler.signup);

router.post('/create',usersControler.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
),usersControler.createSession);

router.get('/sign-out',usersControler.destroySession);

module.exports=router;