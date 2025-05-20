"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarDatosConexionTecnicos = exports.listarDatosGestionTecnicos = exports.listarDatosGeneralesTecnicos = exports.listarTecnicos = void 0;
const express_1 = require("express");
const vw_zonas_1 = __importDefault(require("../../models/Poas2000/vw_zonas"));
const VW_SR_TAB_GESTION_TECNICOS_1 = __importDefault(require("../../models/Poas2000/vistas/VW_SR_TAB_GESTION_TECNICOS"));
const VW_CONEXZONAS_1 = __importDefault(require("../../models/Poas2000/vistas/VW_CONEXZONAS"));
const listarTecnicos = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { Op } = require("sequelize");
    const Query3 = yield vw_zonas_1.default.findAll({
        where: [
            {
                [Op.and]: [{ zonacabecera_id: 1501000 }, { estadoZona_id: [1, 2, 4] }],
            },
        ],
        order: [["zona_id", "ASC"]],
    });
    if (Query3) {
        try {
            console.log(Query3);
            return res.status(200).json({
                ok: true,
                msg: "Informacion Correcta",
                Query3,
            });
        }
        catch (err) {
            return res.status(400).json({
                ok: false,
                msg: "Error de conexión",
            });
        }
    }
    else {
        res.status(401).json({
            ok: false,
            msg: "Error de conexión",
        });
    }
});
exports.listarTecnicos = listarTecnicos;
const listarDatosGeneralesTecnicos = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        // Validación básica
        const { zona_id } = req.body;
        if (!zona_id) {
            return res.status(400).json({
                ok: false,
                msg: "El ID de la zona es requerido",
            });
        }
        // Consulta a la base de datos
        const queryResults = yield vw_zonas_1.default.findAll({
            where: {
                zona_id: zona_id,
            },
        });
        // Respuesta exitosa
        return res.status(200).json({
            ok: true,
            msg: "Información obtenida correctamente",
            data: queryResults,
        });
    }
    catch (error) {
        // Manejo de errores
        console.error("Error al obtener datos generales de técnicos:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la información. Por favor, inténtelo de nuevo más tarde.",
        });
    }
});
exports.listarDatosGeneralesTecnicos = listarDatosGeneralesTecnicos;
const listarDatosGestionTecnicos = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        // Validación básica
        const { zona_id } = req.body;
        if (!zona_id) {
            return res.status(400).json({
                ok: false,
                msg: "El ID de la zona es requerido",
            });
        }
        // Consulta a la base de datos
        const queryResults = yield VW_SR_TAB_GESTION_TECNICOS_1.default.findOne({
            where: {
                zona_id: zona_id,
            },
        });
        // Respuesta exitosa
        return res.status(200).json({
            ok: true,
            msg: "Información obtenida correctamente",
            data: queryResults,
        });
    }
    catch (error) {
        // Manejo de errores
        console.error("Error al obtener datos generales de técnicos:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la información. Por favor, inténtelo de nuevo más tarde.",
        });
    }
});
exports.listarDatosGestionTecnicos = listarDatosGestionTecnicos;
const listarDatosConexionTecnicos = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    try {
        // Validación básica
        const { zona_id } = req.body;
        if (!zona_id) {
            return res.status(400).json({
                ok: false,
                msg: "El ID de la zona es requerido",
            });
        }
        // Consulta a la base de datos
        const queryResults = yield VW_CONEXZONAS_1.default.findOne({
            where: {
                zona_id: zona_id,
            },
        });
        // Respuesta exitosa
        return res.status(200).json({
            ok: true,
            msg: "Información obtenida correctamente",
            data: queryResults,
        });
    }
    catch (error) {
        // Manejo de errores
        console.error("Error al obtener datos generales de técnicos:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener la información. Por favor, inténtelo de nuevo más tarde.",
        });
    }
});
exports.listarDatosConexionTecnicos = listarDatosConexionTecnicos;
