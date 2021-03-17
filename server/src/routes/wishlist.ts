import { Router } from "express";
import {
  addItem,
  createWishlist,
  deleteWishlist,
  getOneWishlist,
  getOwnWishlists,
  getSharedWishlists,
  updateWishlist,
} from "../controllers/wishlist";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.post("/", isAuthenticated, createWishlist);
router.delete("/", isAuthenticated, deleteWishlist);
router.patch("/", isAuthenticated, updateWishlist);
router.get("/one", isAuthenticated, getOneWishlist);
router.get("/own", isAuthenticated, getOwnWishlists);
router.get("/shared", isAuthenticated, getSharedWishlists);
router.post("/addItem", isAuthenticated, addItem);

export default router;
