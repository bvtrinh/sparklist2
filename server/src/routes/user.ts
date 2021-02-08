import { Router } from "express";
import { userInfo, oAuthCallback, logout } from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";
import { passportGoogle, passportTwitter } from "../config/passport";
import passport from "passport";

passport.use(passportGoogle);
passport.use(passportTwitter);

const router = Router();
router.get("/", isAuthenticated, userInfo);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/twitter", passport.authenticate("twitter"));
router.get("/google/callback", passport.authenticate("google"), oAuthCallback);
router.get("/twitter/callback", passport.authenticate("twitter"), oAuthCallback);
router.get("/logout", isAuthenticated, logout);

export default router;
