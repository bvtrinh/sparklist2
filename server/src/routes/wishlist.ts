import { Router } from "express";
import { createWishlist, getOwnWishlists, getSharedWishlists } from "../controllers/wishlist";

const router = Router();

router.post("/", createWishlist);
router.get("/", getOwnWishlists);
router.get("/shared", getSharedWishlists);

export default router;
