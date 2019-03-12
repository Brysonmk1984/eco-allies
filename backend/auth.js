const bcrypt = require('bcrypt-nodejs');
const User = require('./db').User;

const auth = function(passport, LocalStrategy, JWTStrategy, ExtractJWT){
  console.log('HERE', process.env.JWTSECRET, ExtractJWT.fromAuthHeaderAsBearerToken());
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWTSECRET
  },
  function (jwtPayload, cb) {

    console.log('DID I MAKE IT HERE', jwtPayload);
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.find({
        where : {
          email : jwtPayload.email
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



};

module.exports = auth;
