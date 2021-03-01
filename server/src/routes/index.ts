import { Express } from "express";
import UserRoutes from "./user";
import ItemRoutes from "./item";
import WishlistRoutes from "./wishlist";

// Import routes
const indexRouter = (app: Express): void => {
  app.use("/api/u", UserRoutes);
  app.use("/api/i", ItemRoutes);
  app.use("/api/w", WishlistRoutes);
};

export default indexRouter;
