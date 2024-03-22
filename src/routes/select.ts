import { Router} from 'express';
import { listarArea, listarPrioridad, listarUsuario } from '../controllers/select';
const router= Router();
/*SISCARDFORGE*/
router.get('/listarArea',listarArea)
router.get('/listarPrioridad',listarPrioridad)
router.get('/listarUsuario',listarUsuario)


export default router;  