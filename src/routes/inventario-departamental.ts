import { Router } from "express";
import {
  listarEquipo,
  listarEquipoControl,
  listarEquipoDescuento,
  listarEquipoStock,
  listarMarca,
  listarModelo,
  listarTipoEquipo,
} from "../controllers/inventario-departamental";
const router = Router();
router.get("/listarMarca", listarMarca);
router.get("/listarModelo", listarModelo);
router.get("/listarTipoEquipo", listarTipoEquipo);
router.get("/listarEquipo", listarEquipo);
router.get("/listarEquipoStock", listarEquipoStock);
router.get("/listarEquipoControl", listarEquipoControl);
router.get("/listarEquipoDescuento", listarEquipoDescuento);
export default router;
