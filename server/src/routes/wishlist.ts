import { Router } from "express";
import {
  addItem,
  createWishlist,
  deleteWishlist,
  getOneWishlist,
  getOwnWishlists,
  getSharedWishlists,
} from "../controllers/wishlist";

const router = Router();

router.post("/", createWishlist);
router.get("/id/:id", getOneWishlist);
router.get("/", getOwnWishlists);
router.get("/shared", getSharedWishlists);
router.delete("/", deleteWishlist);
router.post("/addItem", addItem);

export default router;
