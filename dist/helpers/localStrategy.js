let user = require('./user_db');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy({
  usernameField: 'email',
  passwordField: 'email',
}, (username, password, done) => {
    user.find_by_email(username).then((user_info)=>{
        if (user_info.error) {
            return done(null, false, {message: "email not found"});
        }
        return done(null, user_info);
    }).catch((err)=>{
        return done(null, false, {message: "error in query"});
    });
});
