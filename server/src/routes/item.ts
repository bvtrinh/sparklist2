import { Router } from "express";
import { createItem, deleteItem, getAllItems, getOneItem } from "../controllers/item";
import { itemURLValidation } from "../middleware/validation";

const router = Router();

router.post("/", itemURLValidation, createItem);
router.get("/limit/:limit/page/:page", getAllItems);
router.get("/:id", getOneItem);
router.delete("/:id", deleteItem);

export default router;
