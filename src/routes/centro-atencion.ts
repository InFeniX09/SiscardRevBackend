import { Router} from 'express';
import {  listarTicket, listarTicketEstadoxFecha } from '../controllers/centro-atencion';
const router= Router();
router.get('/listarTicket',listarTicket)
router.get('/listarTicketEstadoxFecha',listarTicketEstadoxFecha)

export default router;  
