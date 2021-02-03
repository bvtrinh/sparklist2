import { Express } from "express";
import UserRoutes from "./user";

// Import routes
const indexRouter = (app: Express): void => {
  app.use("/api/u", UserRoutes);
};

export default indexRouter;
