const asyncHandler = require("express-async-handler");
const { Message, User } = require("../db/query");
const bcrypt = require("bcryptjs");
const { validateSignUp, validateLogin } = require("../middleware/validation");
const passport = require("passport");

const signUpUserGet = asyncHandler((req, res) => {
   if (req.isAuthorized) {
      return res.redirect("/");
   }

   res.render("signup");
});
const signUpUserPost = [
   validateSignUp,
   asyncHandler(async (req, res) => {
      const { email, password, firstname, lastname } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
         email,
         password: hashedPassword,
         firstname,
         lastname,
      };

      await User.createUser(user);
      res.status(201).redirect("/auth/login");
   }),
];

const loginUserGet = (req, res, next) => {
   if (req.user) {
      return res.redirect("/");
   }

   res.render("login");
};

const loginUserPost = [
   validateLogin,
   (req, res, next) => {
      passport.authenticate("local", (err, user, info, status) => {
         if (err) {
            return next(err);
         }
         if (info) {
            return res.render("login", { email: req.body.email, errors: [{ msg: info.message }] });
         }

         req.login(user, (err) => {
            if (err) throw err;
            res.redirect("/");
         });
      })(req, res, next);
   },
];

const logoutPost = (req, res, next) => {
   req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
   });
};

module.exports = {
   signUpUserGet,
   signUpUserPost,
   loginUserPost,
   loginUserGet,
   logoutPost,
};
