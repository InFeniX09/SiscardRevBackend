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
exports.listarMenuxUsuarioxPerfil = exports.listarMenu = void 0;
const express_1 = require("express");
const menu_1 = __importDefault(require("../models/menu"));
const connection_1 = __importDefault(require("../db/connection"));
//Listo
const listarMenu = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield menu_1.default.findAll({
        raw: true,
        attributes: [
            "IdMenu",
            "Menu",
            "Ruta",
            "RutaImagen",
            "Comando",
            "idTipoMenu",
            "idPadre",
            "Estado_id",
            "UltimaFechMod",
            "UltimoUserMod",
        ],
        where: {
            Estado_id: "1",
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
exports.listarMenu = listarMenu;
//Listo
const listarMenuxUsuarioxPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, idPerfil } = req.query; // Obtén el valor de idTipoMarca de la consulta
        const [results, metadata] = yield connection_1.default.query('EXEC listarMenuxUsuarioxPerfil :idUsuario, :idPerfil', {
            replacements: { idUsuario, idPerfil }, // Pasar el valor del parámetro
        });
        // Extrae la lista de marcas del resultado
        const selectmarca = results.map((result) => ({
            IdMenu: result.IdMenu,
            Menu: result.Menu,
            Ruta: result.Ruta,
            RutaImagen: result.RutaImagen,
            Comando: result.Comando,
            idTipoMenu: result.idTipoMenu,
            idPadre: result.idPadre,
            Estado_id: result.Estado,
            UltimaFechMod: result.UltimaFechMod,
            UltimoUserMod: result.UltimoUserMod,
        }));
        res.json(selectmarca);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener las marcas.'
        });
    }
});
exports.listarMenuxUsuarioxPerfil = listarMenuxUsuarioxPerfil;
