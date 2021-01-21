import { Express } from "express";
import UserRoutes from "./user";

// Import routes
const indexRouter = (app: Express) => {
  app.use("/api/u", UserRoutes);
};

export default indexRouter;
