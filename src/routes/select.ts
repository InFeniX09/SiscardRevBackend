import { Router } from "express";
import {listarArea, listarPrioridad} from "../controllers/Soporte/centro-atencion"

const router = Router();
router.get("/listarArea", listarArea);
router.get("/listarPrioridad", listarPrioridad);

export default router;
