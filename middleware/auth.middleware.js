const isMember = (req, res, next) => {
   if (req.user.role === "member" || req.user.role === "admin") {
      return next();
   }

   res.redirect("/");
};

const isAdmin = (req, res, next) => {
   if (req.user.role === "admin") {
      return next();
   }

   res.redirect("/");
};

const isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   }

   res.redirect("/auth/login");
};

module.exports = {
   isMember,
   isAdmin,
   isAuthenticated,
};
