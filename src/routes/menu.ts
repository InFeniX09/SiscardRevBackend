import { Router} from 'express';
import { listarMenu, listarMenuxUsuarioxPerfil } from '../controllers/menu';
const router= Router();
router.get('/listarMenu',listarMenu)
router.get('/listarMenuxUsuarioxPerfil',listarMenuxUsuarioxPerfil)

export default router;  
