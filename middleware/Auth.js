var passport = require('passport'),
    bcrypt = require('bcrypt-nodejs'),
    Admin = require('../models/Admin'),
    jwt = require('jsonwebtoken'),
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    LocalStategy = require('passport-local').Strategy;

var secret = process.env.JWT_SECRET || 'SECRET';
    
    
passport.use(new LocalStategy(function(username, password, done){
    Admin.findOne({username: username},function (err,admin) {
        if(err) done(err);
        console.log(admin);
        if(!admin){
            return done(null, false, {message: 'Invalid user'});
        } else {
            if(bcrypt.compareSync(password, admin.password)){
                var token = jwt.sign({
                    data: admin._id
                },secret);
                return done(null, token);
            } else {
                return done(null, false, {message: 'Incorrect password'});
            }
        }
    })
}));

var opts = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromHeader('authorization')
};


passport.use(new JWTStrategy(opts,function (jwt_payload, done) {
    Admin.findOne({_id: jwt_payload.data},function (err, admin) {
        if(err) return done(err);
        if(!admin){
            return done(null, false, {message: 'Incorrect'});
        } else {
            return done(null, true, true);
        }
    });
}));

module.exports = passport;


