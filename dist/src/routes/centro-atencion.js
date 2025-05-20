"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const centro_atencion_1 = require("../controllers/centro-atencion");
const router = (0, express_1.Router)();
router.get('/listarTicket', centro_atencion_1.listarTicket);
router.get('/listarTicketEstadoxFecha', centro_atencion_1.listarTicketEstadoxFecha);
exports.default = router;
