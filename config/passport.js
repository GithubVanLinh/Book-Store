const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const crypto = require("crypto");

var hashPwd = function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac("sha256", salt);
  return hmac.update(pwd).digest("hex");
};

module.exports = function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const usrData = await User.getUserInfo(username);
        console.log("passport", "User data", usrData);
        if (usrData) {
          console.log("passport", "userData", usrData);
          console.log("passport", "salt", usrData.salt);
          console.log("passport", "pwd", password);
          const pass = hashPwd(usrData.salt, password);
          console.log("passport", "pass", pass);
          if (usrData.password === pass) {
            return done(null, usrData);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        }
        return done(null, false, { message: "Incorrect username." });
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("serial", user);
    done(null, user.email);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("id", id);
    const user =await User.getUserInfo(id);
    console.log("user", user);
    done(null, user);
  });
};
