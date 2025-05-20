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
exports.listarUsuario = exports.listarPrioridad = void 0;
const express_1 = require("express");
const priodidad_1 = __importDefault(require("../models/priodidad"));
const usuario_1 = __importDefault(require("../models/usuario"));
//Listo
const listarPrioridad = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield priodidad_1.default.findAll({
        raw: true,
        attributes: [
            "IdPrioridad",
            "Prioridad"
        ],
        where: {
            Estado: "A",
        },
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
            console.log(err);
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
exports.listarPrioridad = listarPrioridad;
//Listo
const listarUsuario = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield usuario_1.default.findAll({
        raw: true,
        attributes: [
            "IdUsuario",
            "Usuario",
            "Correo",
            "RutaImagen"
        ],
        where: {
            Estado: "A",
        },
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
            console.log(err);
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
exports.listarUsuario = listarUsuario;
