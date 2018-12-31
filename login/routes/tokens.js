const express = require('express');
const router = express.Router(); 
const User = require('../db').User;
// express-validator
const { buildCheckFunction, validationResult } = require('express-validator/check');
const checkBody = buildCheckFunction(['body']);
const store = require('../store').store;
// REGISTER NEW ACCOUNT
router.post('/register', [
  checkBody('code', 'Email address must be 9 characters long, please try again.').isLength({ min: 9, max: 9 }),
  ], function(req, res){
  const errors = validationResult(req);
  console.log('ERRORS!!', errors.array());
  if(!errors.isEmpty()){
    res.json({ requestType : 'POST', success : false, error : errors.array() });
    return;
  }
  User.create({
    email : req.body.email,
    password : req.body.password,
    publicEthKey : req.body.publicEthKey,
  })
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
  passport.authenticate('local',function(err, u, info){
    store.get(req.sessionID, (err,sess)=>{
      if(err){
        console.log('Error retrieving session - ', err);
        return res.json({
          error: "Error retrieving session ",
          isAuthenticated : false,
          requestType : 'POST',
          success : false
        });
      }
    })
    if (err) return next(err);
    if (!u.email) {
      console.log('No user found...');
      return res.json({
        error: "No user found...",
        isAuthenticated : false,
        requestType : 'POST',
        success : false
      });
    }
    // Manually establish the session...
    req.login(u.email, function(err) {
      if (err) return next(err);
      User.find({
        where : {
        email : u.email
        },
        attributes:['publicEthKey']
      }).then((user, err) => {
        res.json({
        sessionId : req.sessionID,
        email : u.email,
        publicEthKey : user.dataValues.publicEthKey,
        isAuthenticated : true,
        requestType : 'POST',
        success : true
        });
        next();
      });
    });
  })(req, res, next);
});
router.get('/logout', function(req, res){
  console.log('sessid-1',req.sessionID);
  req.session.destroy(((err)=>{
    if(err){
      console.log('Error destroying session - ', err);
      res.json({error : err, isAuthenticated : true, requestType : 'GET', success : false});
    }
  }));
  req.logout();
  res.json({isAuthenticated : false, requestType : 'GET', success : true});
});


/*
* Check the request if the user is authenticated.
* Return an error message if not, otherwise keep going :)
*/
// router.use(function(req, res, next){
//   console.log('REQUSER -- ', req.user);
//   // isAuthenticated is set by `deserializeUser()`
//   if (!req.isAuthenticated || !req.isAuthenticated()) {
//       //console.log('BEFORE error', req.isAuthenticated());
//       res.status(401).send({
//       success: false,
//       message: 'You are not logged in',
//       requestType : 'GET'
//       });
//   }else{
//       next();
//   }
// });

router.get('/logged-in', function(req, res, next){
  console.log('CHECKING IF LOGGED IN', req.user);
  User.find({
    where : {
    email : req.user
  },
  attributes:['publicEthKey']
  })
  .then((user, err)=>{
    if (err) return next(err);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.status(200).send({
      success: true,
      message: `You are logged in as ${req.user}`,
      email: req.user,
      publicEthKey: user.dataValues.publicEthKey,
      requestType : 'GET'
    });
    next();
  });
});

module.exports = router;