let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let db = require("../models");

passport.use(new LocalStrategy({
        usernameField: "username"
    },
    function (username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function (typedUser) {
            if (!typedUser) {
                return done(null, false, {
                    message: "Incorrect User."
                });
            }
            else if (!typedUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, typedUser)
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;