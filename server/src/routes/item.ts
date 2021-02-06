import { Router } from "express";
import { createItem, getAllItems, getOneItem, updateItem } from "../controllers/item";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getOneItem);
router.post("/:id", updateItem);

export default router;
