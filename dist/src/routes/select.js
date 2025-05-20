"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const centro_atencion_1 = require("../controllers/Soporte/centro-atencion");
const router = (0, express_1.Router)();
router.get("/listarArea", centro_atencion_1.listarArea);
router.get("/listarPrioridad", centro_atencion_1.listarPrioridad);
exports.default = router;
