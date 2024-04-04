import { Router} from 'express';
import { listarAlbaranes, listarAlmacenxAlbaranSalida } from '../controllers/Logistica/guia-remision';
const router= Router();
router.get('/listarAlmacenxAlbaranSalida',listarAlmacenxAlbaranSalida)
router.get('/listarAlbaranes',listarAlbaranes)

export default router;  
