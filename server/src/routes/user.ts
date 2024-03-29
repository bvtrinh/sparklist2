import passport from "passport";
import { Router } from "express";
import {
  userInfo,
  oAuthCallback,
  logout,
  createInvite,
  googleSignUp,
  twitterSignUp,
} from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";

const router = Router();
router.get("/", isAuthenticated, userInfo);
router.get(
  "/google-login",
  passport.authenticate("google-login", { scope: ["profile", "email"], prompt: "select_account" })
);
router.get("/google-signup/:invite", googleSignUp);
router.get("/twitter-login", passport.authenticate("twitter-login"));
router.get("/twitter-signup/:invite", twitterSignUp);
router.get("/google-login/callback", passport.authenticate("google-login"), oAuthCallback);
router.get("/twitter-login/callback", passport.authenticate("twitter-login"), oAuthCallback);
router.get("/logout", isAuthenticated, logout);
router.get("/create_invite", isAuthenticated, createInvite);

export default router;
