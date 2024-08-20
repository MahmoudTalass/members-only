const { validationResult, body } = require("express-validator");
const { User } = require("../db/query");

const validateSignUp = [
   body("email")
      .trim()
      .isEmpty()
      .withMessage("Must enter an email.")
      .isEmail("Must enter a valid email.")
      .custom(async (email) => {
         const user = await User.getUserByEmail(email);

         if (user) {
            throw Error("This email is already in use.");
         }
      }),
   body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
   body("passwordConfirmation")
      .trim()
      .custom((value, { req }) => {
         return value === req.body.password;
      })
      .withMessage("Passwords must match."),
   body("firstname").trim().isEmpty().withMessage("Must enter a first name."),
   body("lastname").trim().isEmpty().withMessage("Must enter a last name."),
   (req, res, next) => {
      const errors = validationResult();

      if (!errors.isEmpty()) {
         return res.render("signup", {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            errors: errors.array(),
         });
      }

      next();
   },
];

const validateLogin = [
   body("email")
      .trim()
      .isEmpty()
      .withMessage("Must enter an email.")
      .isEmail("Must enter a valid email."),

   body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
   (req, res, next) => {
      const errors = validationResult();

      if (!errors.isEmpty()) {
         return res.render("signup", {
            email: req.body.email,
            errors: errors.array(),
         });
      }

      next();
   },
];

module.exports = {
   validateLogin,
   validateSignUp,
};
