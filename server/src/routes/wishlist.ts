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

const router = Router();

router.post("/", createWishlist);
router.delete("/", deleteWishlist);
router.patch("/", updateWishlist);
router.get("/one", getOneWishlist);
router.get("/own", getOwnWishlists);
router.get("/shared", getSharedWishlists);
router.post("/addItem", addItem);

export default router;
