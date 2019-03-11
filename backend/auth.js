const bcrypt = require('bcrypt-nodejs');
const User = require('./db').User;

const auth = function(passport, LocalStrategy, JWTStrategy, ExtractJWT){

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'secret'
  },
  function (jwtPayload, cb) {

      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.find({
        where : {
          email : jwtPayload.token
        }
      })
      .then(user => {
        console.log('JTW USER', user);
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });
  }
  ));


  passport.use(new LocalStrategy({
    usernameField:'email', passwordField:'password'
    },
    function(email, password, done) {
      User.find({
        where : {
          email
        },
        attributes:['id','email', 'password']
      })
      .then((user, error)=>{
        console.log('FOUND USER!', user);
        if(user){
          bcrypt.compare(password, user.dataValues.password, function(err, isMatch){
            if(err){console.log(err);}
            if(isMatch){
              return done(null, user, {message : 'Match'});
            }else{
              return done(null, false, {message : 'Password did not match'});
            }
          });
        }else{
          return done(error, false, {message : 'No Account found'});
        }
      })
      .error(function(error){
        console.log('ERROR - ',error);
        return done(error, null);
      });
    }
  ));

  // Gets information from the user object and serilizes it in a session
  // Happends when a user logs in
  passport.serializeUser(function(userId, done) {
    console.log('SERIALIZE USER', userId);
    // userId in this case is the user email
    // accessible in routes by req.session.passport.userId
    done(null, userId);
  });
    
  // Turns the serilized user object back into a JS user object for use in the rest of the code
  // Happends any time a user visists a page that makes a call to the backend
  passport.deserializeUser(function(userId, done) {
    console.log('DESERIALIZE USER ', userId);
    done(null, userId);
  });

};

module.exports = auth;
