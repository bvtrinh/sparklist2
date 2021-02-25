import { RequestHandler } from "express";
import { Invite } from "../models/invite.model";
import { SESSION_NAME, REDIRECT_CLIENT_URL } from "../config/constants";
import passport from "passport";

export const userInfo: RequestHandler = async (req, res) => {
  return res.status(200).json(req.session.passport);
};

export const oAuthCallback: RequestHandler = async (req, res) => {
  // TODO: Change this redirect before production
  return res.status(201).redirect(REDIRECT_CLIENT_URL);
};

export const logout: RequestHandler = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server unable to logout. Try again later." });
    }
    res.clearCookie(SESSION_NAME);
    return res.status(200).json({ message: "Successful logout!" });
  });
};

export const createInvite: RequestHandler = async (req, res) => {
  try {
    let newInvite = new Invite({ creator: req.session.passport?.user._id });
    newInvite = await newInvite.save();

    return res.status(200).json({ payload: newInvite, message: "Invite created", error: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to generate invite link" });
  }
};

export const googleSignUp: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "google-signup",
    {
      scope: ["profile", "email"],
      prompt: "select_account",
      state: req.params.invite,
    },
    (err, user, info) => {
      if (err) {
        console.error(info.message);
        return res.status(400).redirect(REDIRECT_CLIENT_URL);
      } else {
        req.login(user, () => {
          return res.status(201).redirect(REDIRECT_CLIENT_URL);
        });
      }
    }
  )(req, res, next);
};

export const twitterSignUp: RequestHandler = (req, res, next) => {
  // Bug with passport twitter sending two different endpoints to
  // authenticate which overwrites the params
  if (req.session.invite && req.session.invite.length >= 0)
    req.session.invite?.push(req.params.invite);
  else req.session.invite = [req.params.invite];

  passport.authenticate("twitter-signup", { passReqToCallback: true }, function (err, user) {
    if (err) {
      console.error(err);
      return res.status(400).redirect(REDIRECT_CLIENT_URL);
    } else {
      req.login(user, () => {
        return res.status(201).redirect(REDIRECT_CLIENT_URL);
      });
    }
  })(req, res, next);
};
