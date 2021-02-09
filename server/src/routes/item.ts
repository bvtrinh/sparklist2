import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemsPaginated,
  getOneItem,
  updateItem,
} from "../controllers/item";
import { itemURLValidation } from "../middleware/validation";

const router = Router();

router.post("/", itemURLValidation, createItem);
router.get("/", getAllItems);
router.get("/:id", getOneItem);
router.post("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/limit/:limit/page/:page", getItemsPaginated);

export default router;
