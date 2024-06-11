import { Router} from 'express';
import { buscarUsuario } from '../controllers/Auth/auth';
const router= Router();
/*SISCARDFORGE*/

router.post('/buscarUsuario',buscarUsuario)

export default router;  