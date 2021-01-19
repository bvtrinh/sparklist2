import { RequestHandler } from "express";

export const testRoute: RequestHandler = async (req, res) => {
  return res.status(200).json({ message: "It's working!!! 👍" });
};
