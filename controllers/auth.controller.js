const asyncHandler = require("express-async-handler");
const { Message, User } = require("../db/query");
const bcrypt = require("bcryptjs");
const { validateSignUp } = require("../validation/validation");

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
      res.sendStatus(201);
   }),
];

module.exports = {
   signUpUserGet,
   signUpUserPost,
};
