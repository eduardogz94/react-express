import user from './user_db';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
    user.getUserByEmail(username).then((user_info)=>{
        if (user_info.error) {
            return done(null, false, {message: "email not found"});
        }
        return done(null, user_info);
    }).catch((err)=>{
        return done(null, false, {message: "error in query"});
    });
});
