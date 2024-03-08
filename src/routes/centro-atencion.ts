import { Router} from 'express';
import { crearTicket, listarTicket } from '../controllers/centro-atencion';
const router= Router();
router.get('/listarTicket',listarTicket)
router.post('/crearTicket',crearTicket)

export default router;  
