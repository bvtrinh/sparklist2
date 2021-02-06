import { Router } from "express";
import { createItem, getAllItems, getOneItem } from "../controllers/item";

const router = Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getOneItem);

export default router;
