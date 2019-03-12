const express = require('express');
const router = express.Router(); 
const User = require('../db').User;
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/logged-in', function(req, res, next){

  
  passport.authenticate('jwt', { session : false }, (err, user, data) => {
    console.log('in jwt auth');
    if(err){
      console.log(err);
      res.status(401).send('There was an error with JWT');
      return;
    }
    console.log('USER', user);


    User.find({
      where : {
      email : user.email
    },
      attributes:['publicEthKey', 'fullAccount', 'username']
    })
    .then((user, err)=>{
      if (err) return next(err);
        //res.header('Access-Control-Allow-Credentials', 'true');
        //const token = jwt.sign({ email : u.email }, process.env.JWTSECRET);
        res.status(200).send({
        success: true,
        message: `You are logged in as ${req.user}`,
        email: user.email,
        username : user.dataValues.username,
        publicEthKey : user.dataValues.publicEthKey,
        fullAccount : user.dataValues.fullAccount,
        //token
      });
      next();
    });
  })(req, res, next);
});

module.exports = router;