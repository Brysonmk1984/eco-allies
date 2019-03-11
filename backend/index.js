// NODE
const path = require('path');
require('dotenv').load();
// LIBRARIES
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const fileUpload = require('express-fileupload');
// COMMON
const userRoutes = require('./routes/users');
const tokenRoutes = require('./routes/tokens');
const sessionStore = require('./store').sessionStore;



  // http server
app.listen( process.env.PORT || 3001, function () {
    
  console.log('Listening on port ' + (process.env.PORT || 3001));
  // Middleware
  // logger
  app.use(morgan('dev'));
  app.use(cors({credentials: true, origin : true}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser('1123ddsgfdrtrthsds'));
  app.set('trust proxy', 1);
  app.use(sessionStore);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(fileUpload());
  require('./auth.js')(passport, LocalStrategy, JWTStrategy, ExtractJWT );
  
  app.options('*', cors())
  // HTTP Routes
  app.use('/users', passport.authenticate('jwt', {session: false}), userRoutes);
  app.use('/tokens', passport.authenticate('jwt', {session: false}), tokenRoutes);
  // app.use('/test', passport.authenticate('jwt', {session: false}), () => {
  //   app.get('/jwt', function(req, res, next){
  //     console.log('HEY LOOOOOOOOOOOOOOOK AT THIS');
  //     user.find({
  //     where : {
  //     email : req.user
  //     },
  //     attributes:['publicEthKey']
  //     })
  //     .then((user, error)=>{
  //         res.status(200).send({
  //         success: true,
  //         message: `You are logged in as ${req.user}`,
  //         publicEthKey: user.dataValues.publicEthKey,
  //         requestType : 'GET'
  //         });
  //         next();
  //     });
  //   });
  // });
});


