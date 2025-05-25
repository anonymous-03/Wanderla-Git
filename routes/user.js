const express = require("express");
const User = require("../models/user");
const router = express.Router();
const asyncWrap = require("../Utils/asyncWrap");
const passport = require("passport");
const { saveRedirectedUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.get("/register", userController.registerUser);

router.post("/register", asyncWrap(userController.registerForm))

router.get("/login", userController.loginRoute)

router.post("/login",
    saveRedirectedUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    userController.login)

router.get("/logout", userController.logoutRoute);

module.exports = router;
