import { Router } from "express";
import { deleteModel } from "mongoose";
import {
  createWishlist,
  deleteWishlist,
  getOwnWishlists,
  getSharedWishlists,
} from "../controllers/wishlist";

const router = Router();

router.post("/", createWishlist);
router.get("/", getOwnWishlists);
router.get("/shared", getSharedWishlists);
router.delete("/", deleteWishlist);

export default router;
