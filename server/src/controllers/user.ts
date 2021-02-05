import { RequestHandler } from "express";

export const userInfo: RequestHandler = async (req, res) => {
  return res.status(200).json(req.session.passport);
};

export const googleCallback: RequestHandler = async (req, res) => {
  // TODO: Change this redirect before production
  return res.status(201).redirect("http://localhost:3000/profile");
};

export const logout: RequestHandler = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server unable to logout. Try again later." });
    }
    res.clearCookie("SESSION_ID");
    return res.status(200).json({ message: "Successful logout!" });
  });
};
