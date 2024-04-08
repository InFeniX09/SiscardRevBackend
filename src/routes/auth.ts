import { Router} from 'express';
import { buscarUsuario, listarEntidad, listarUsuario, listaralbaran, listarcomponentes } from '../controllers/auth';
const router= Router();
/*SISCARDFORGE*/

router.post('/buscarUsuario',buscarUsuario)

router.post('/listarUsuario',listarUsuario)
router.post('/listarEntidad',listarEntidad)

router.get('/listarcomponentes',listarcomponentes)
router.get('/listaralbaran',listaralbaran)


export default router;  