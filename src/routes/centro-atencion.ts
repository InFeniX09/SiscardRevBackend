import { Router} from 'express';
import { crearTicket, listarTicket, listarTicketEstadoxFecha } from '../controllers/centro-atencion';
const router= Router();
router.get('/listarTicket',listarTicket)
router.post('/crearTicket',crearTicket)
router.get('/listarTicketEstadoxFecha',listarTicketEstadoxFecha)

export default router;  
