import { RequestHandler } from "express";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    return next();
  }
  return req.session.passport ? next() : res.status(401).json({ message: "Not authenticated" });
};
