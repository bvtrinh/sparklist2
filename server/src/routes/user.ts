import { Router } from "express";
import { testRoute } from "../controllers/user";

const router = Router();

router.get("/", testRoute);

export default router;
