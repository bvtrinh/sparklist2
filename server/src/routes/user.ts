import passport from "passport";
import { Router } from "express";
import { userInfo, oAuthCallback, logout, createInvite, googleSignUp } from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";

const router = Router();
router.get("/", isAuthenticated, userInfo);
router.get("/google-login", passport.authenticate("google-login", { scope: ["profile", "email"] }));
router.get("/google-signup/:invite", googleSignUp);
router.get("/twitter", passport.authenticate("twitter"));
router.get("/google-login/callback", passport.authenticate("google-login"), oAuthCallback);
router.get("/google-signup/callback", passport.authenticate("google-signup"), oAuthCallback);
router.get("/twitter/callback", passport.authenticate("twitter"), oAuthCallback);
router.get("/logout", isAuthenticated, logout);
router.get("/create_invite", isAuthenticated, createInvite);

export default router;
