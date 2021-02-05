import { RequestHandler } from "express";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  return req.session.passport ? next() : res.status(401).json({ message: "Not authenticated" });
};
