const express = require('express');
const router = express.Router(); 
const User = require('../db').User;
const jwt = require('jsonwebtoken');
const passport = require('passport');
// express-validator
const { buildCheckFunction, validationResult } = require('express-validator/check');
const checkBody = buildCheckFunction(['body']);
const store = require('../store').store;

// REGISTER NEW ACCOUNT
router.post('/register', [
  checkBody('email', 'The email you entered is invalid, please try again.').isEmail(),
  checkBody('email', 'Email address must be between 4-100 characters long, please try again.').isLength({ min: 4, max: 100 }),
  checkBody('password', 'Password must be between 8-100 characters long.').isLength({ min: 8, max: 100 }),
  //checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  checkBody('passwordConfirm', 'Password must be between 8-100 characters long.').isLength({ min: 8, max: 100 }),
  checkBody('passwordConfirm', 'Passwords do not match, please try again.').custom((value, { req }) => value === req.body.password),
  ], function(req, res){
  const errors = validationResult(req);
  console.log('ERRORS!!', errors.array());
  if(!errors.isEmpty()){
    res.json({ requestType : 'POST', success : false, error : errors.array() });
    return;
  }
  console.log('REQBODY', req.body);
  const userObj = {
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  };

  if(req.body.fullAccount){
    userObj.fullAccount = true;
    userObj.publicEthKey = req.body.publicEthKey;
  }
  console.log('UO', userObj, req.body.password.length);
  User.create(userObj)
  .then((user)=>{console.log('u2', user);
    req.login(user.id, function(err){
      if(err){
        res.json({ requestType : 'POST', success : false, error : err });
      }
      res.json({ requestType : 'POST', success : true, user });
    });
  })
  .catch((err) =>{console.log('CAUGHT ERR', err);
    res.json({ requestType : 'POST', success : false, error : err });
  });
});

// LOGIN TO EXISTING ACCOUNT
router.post('/login', function(req, res, next){
  console.log('trying to log in');
  passport.authenticate('local', { session : false }, function(err, u, info){

    if (!u.email) {
      console.log('No user found...');
      return res.status(401).send('Email or Password is incorrect.');
    }

    req.login(u.email, { session : false }, function(err) {
      if (err) return next(err);
      User.find({
        where : {
          email : u.email
        },
        attributes:['publicEthKey', 'fullAccount', 'username']
      }).then((user, err) => {

        const token = jwt.sign({ email : u.email }, process.env.JWTSECRET);
        res.json({
        email : u.email,
        username : user.dataValues.username,
        publicEthKey : user.dataValues.publicEthKey,
        fullAccount : user.dataValues.fullAccount,
        isAuthenticated : true,
        requestType : 'POST',
        success : true,
        token
        });
        next();

      });
    });
  })(req, res, next);
});
router.get('/logout', function(req, res){

  req.logout();
  res.json({isAuthenticated : false, requestType : 'GET', success : true});
});

// router.get('/logged-in', function(req, res, next){
//   console.log('CHECKING IF LOGGED IN', req.user);
//   if(!req.user){
//     res.status(403).send('You are not logged in!');
//     return;
//   }

//   User.find({
//     where : {
//     email : req.user
//   },
//   attributes:['publicEthKey', 'fullAccount', 'username']
//   })
//   .then((user, err)=>{
//     if (err) return next(err);
//       res.header('Access-Control-Allow-Credentials', 'true');
//       res.status(200).send({
//       success: true,
//       message: `You are logged in as ${req.user}`,
//       email: req.user,
//       username : user.dataValues.username,
//       publicEthKey : user.dataValues.publicEthKey,
//       fullAccount : user.dataValues.fullAccount,
//       requestType : 'GET'
//     });
//     next();
//   });
// });

router.post('/logged-in', function(req, res, next){
  console.log('CHECKING IF LOGGED IN!!!!', req.user, req.body, req.headers);
  if(!req.user){
    res.status(403).send('You are not logged in!');
    return;
  }

  User.find({
    where : {
    email : req.user
  },
  attributes:['publicEthKey', 'fullAccount', 'username']
  })
  .then((user, err)=>{
    if (err) return next(err);
      res.header('Access-Control-Allow-Credentials', 'true');
      const token = jwt.sign({ email : u.email }, process.env.JWTSECRET);
      res.status(200).send({
      success: true,
      message: `You are logged in as ${req.user}`,
      email: req.user,
      username : user.dataValues.username,
      publicEthKey : user.dataValues.publicEthKey,
      fullAccount : user.dataValues.fullAccount,
      requestType : 'GET',
      token
    });
    next();
  });
});

module.exports = router;