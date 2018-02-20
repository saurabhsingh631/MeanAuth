const JwtStratgy = require("passport-jwt").Strategy;
const Extract = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../config/database");

module.exports =  function(passport) {
    let opts = {};
    opts.jwtFromRequest = Extract.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStratgy(opts, function(jwt_payload,done){
        User.getUserById(jwt_payload.data._id,function(err, user){
            if(err) {
                return done(err,false);
            }
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }))
}