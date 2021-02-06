import { Router } from "express";
import { createItem, deleteItem, getAllItems, getOneItem, updateItem } from "../controllers/item";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getOneItem);
router.post("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
