import { Router} from 'express';
import { buscarUsuario, listaralbaran, listarcomponentes } from '../controllers/auth';
const router= Router();
/*SISCARDFORGE*/

router.post('/buscarUsuario',buscarUsuario)
router.get('/listarcomponentes',listarcomponentes)
router.get('/listaralbaran',listaralbaran)


export default router;  