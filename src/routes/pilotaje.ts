import { Router } from "express";
import { listarClientes } from "../controllers/Pilotaje/guia-clientes";
import {
  listarTecnicos,
  listarDatosGeneralesTecnicos,
  listarDatosGestionTecnicos,
  listarDatosConexionTecnicos,
} from "../controllers/Pilotaje/guia-tecnico";

const router = Router();
router.get("/listarClientes", listarClientes);
router.get("/listarTecnicos", listarTecnicos);
router.post("/listarDatosGeneralesTecnicos", listarDatosGeneralesTecnicos);
router.post("/listarDatosGestionTecnicos", listarDatosGestionTecnicos);
router.post("/listarDatosConexionTecnicos", listarDatosConexionTecnicos);

export default router;
