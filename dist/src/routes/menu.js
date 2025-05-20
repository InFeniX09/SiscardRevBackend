"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_1 = require("../controllers/menu");
const router = (0, express_1.Router)();
router.get('/listarMenu', menu_1.listarMenu);
router.get('/listarMenuxUsuarioxPerfil', menu_1.listarMenuxUsuarioxPerfil);
exports.default = router;
