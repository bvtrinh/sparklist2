import { Router } from "express";
import { userInfo, googleCallback, logout } from "../controllers/user";
import { isAuthenticated } from "../middleware/auth";
import { passportGoogle } from "../config/passport";
import passport from "passport";

passport.use(passportGoogle);

const router = Router();
router.get("/", isAuthenticated, userInfo);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google"), googleCallback);
router.get("/logout", isAuthenticated, logout);

export default router;
