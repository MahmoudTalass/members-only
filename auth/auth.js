const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db/query");
const bcrypt = require("bcryptjs");

module.exports.setUpAuth = (app) => {
   app.use(passport.session());
   passport.use(
      new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
         try {
            const user = await User.getUserByEmail(email);

            if (!user) {
               return done(null, false, { message: "Incorrect username." });
            }

            const matched = await bcrypt.compare(password, user.password);

            if (!matched) {
               return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
         } catch (err) {
            done(err);
         }
      })
   );

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser(async (id, done) => {
      try {
         const user = await User.getUserById(id);
         done(null, user);
      } catch (err) {
         done(err);
      }
   });
};
