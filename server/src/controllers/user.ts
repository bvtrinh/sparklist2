import { RequestHandler } from "express";
import { SESSION_NAME, REDIRECT_CLIENT_URL } from "../config/constants";

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
