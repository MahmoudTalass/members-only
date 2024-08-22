const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/index.controller");

router.use("/", (req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});

const authRoute = require("./auth.route");
router.use("/auth", authRoute);

router.get("/", (req, res) => res.redirect("/home"));

router.get("/home", indexController.homePage);

router.get("/new-message", indexController.createMessageGet);
router.post("/new-message", indexController.createMessagePost);

module.exports = router;
