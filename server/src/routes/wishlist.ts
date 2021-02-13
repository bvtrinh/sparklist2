import { Router } from "express";
import { createWishlist } from "../controllers/wishlist";

const router = Router();

router.post("/", createWishlist);

export default router;
