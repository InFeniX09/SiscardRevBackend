import { Router} from 'express';
import { buscarUsuario, login, logout } from '../controllers/auth';
const router= Router();
/*SISCARDFORGE*/
router.post('/login',login)
router.get('/logout',logout)
router.get('/buscarUsuario',buscarUsuario)


export default router;  