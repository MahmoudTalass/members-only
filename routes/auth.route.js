const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/auth.controller");

router.get("/login");
router.post("/login");

router.get("/sign-up", signUpController.signUpUserGet);
router.post("/sign-up", signUpController.signUpUserPost);

module.exports = router;
