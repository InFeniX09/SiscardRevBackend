import { Router } from "express";
import {
  crearcliente,
  crearequipo,
  crearequipocontrol,
  crearequipodescuento,
  crearmarca,
  crearmodelo,
  crearproveedor,
  creartipoequipo,
  listarcliente,
  listarcolor,
  listarmenu,
  listarpersona,
  listarproveedor,
  listartipomenu,
  listarusuario,
} from "../controllers/infraestructura";
const router = Router();
router.get("/listarcliente", listarcliente);
router.get("/listarproveedor", listarproveedor);
router.get("/listarcolor", listarcolor);

router.get("/listartipomenu", listartipomenu);
router.get("/listarmenu", listarmenu);
router.get("/listarpersona", listarpersona);
router.get("/listarusuario", listarusuario);
/*Crear*/
router.post("/crearequipo", crearequipo);
router.post("/crearequipocontrol", crearequipocontrol);
router.post("/crearequipodescuento", crearequipodescuento);
router.post("/creartipoequipo", creartipoequipo);
router.post("/crearmarca", crearmarca);
router.post("/crearmodelo", crearmodelo);
router.post("/crearcliente", crearcliente);
router.post("/crearproveedor", crearproveedor);

export default router;
