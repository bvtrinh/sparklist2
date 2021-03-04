import { Router } from "express";
import { createItem, deleteItem, getAllItems, getOneItem } from "../controllers/item";
import { itemURLValidation } from "../middleware/validation";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.post("/", isAuthenticated, itemURLValidation, createItem);
router.get("/limit/:limit/page/:page", isAuthenticated, getAllItems);
router.get("/:id", isAuthenticated, getOneItem);
router.delete("/:id", isAuthenticated, deleteItem);

export default router;
