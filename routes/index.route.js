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

router.get("/member-form", indexController.memberFormGet);
router.post("/member-form", indexController.memberFormPost);

router.get("/admin-form", indexController.adminFormGet);
router.post("/admin-form", indexController.adminFormPost);

router.post("/message/:id/delete", indexController.deleteMessagePost);

module.exports = router;
