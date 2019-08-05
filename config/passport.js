<<<<<<< HEAD
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
=======
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
>>>>>>> 4a77d841318066ab7377c26319db6e20bd748a94

var db = require("../models");

passport.use(new LocalStrategy({
<<<<<<< HEAD
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
=======
  usernameField: "username"
},
function (username, password, done) {
  db.User.findOne({
    where: {
      username: username
>>>>>>> 4a77d841318066ab7377c26319db6e20bd748a94
    }
  }).then(function (typedUser) {
    if (!typedUser) {
      return done(null, false, {
        message: "Incorrect User."
      });
    } else if (!typedUser.validPassword(password)) {
      return done(null, false, {
        message: "Incorrect password."
      });
    }
    return done(null, typedUser);
  });
}
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;