const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.loginUserGet);
router.post("/login", authController.loginUserPost);

router.post("/logout", authController.logoutPost);

router.get("/sign-up", authController.signUpUserGet);
router.post("/sign-up", authController.signUpUserPost);

module.exports = router;
