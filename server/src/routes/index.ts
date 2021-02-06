import { Express } from "express";
import UserRoutes from "./user";
import ItemRoutes from "./item";

// Import routes
const indexRouter = (app: Express): void => {
  app.use("/api/u", UserRoutes);
  app.use("/api/i", ItemRoutes);
};

export default indexRouter;
