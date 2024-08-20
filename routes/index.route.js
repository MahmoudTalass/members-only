const { Router } = require("express");
const router = Router();

router.use("/", (req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});

const authRoute = require("./auth.route");
router.use("/auth", authRoute);

module.exports = router;
