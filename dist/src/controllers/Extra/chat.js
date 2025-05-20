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
exports.listarEquiposSiscardSocket = exports.listarZonasSocket = exports.PostlistarMenuxUsuarioxPerfil = exports.listarMenuxUsuarioxPerfil = exports.generarExcelReporte = exports.listarReporte = exports.listarUsuarioSocket = exports.crearMensajeSocket = exports.listarchatSocket = void 0;
const express_1 = require("express");
const mensaje_1 = __importDefault(require("../../models/mensaje"));
const usuario_1 = __importDefault(require("../../models/usuario"));
const entidad_1 = __importDefault(require("../../models/entidad"));
const sequelize_1 = require("sequelize");
const reporte_1 = __importDefault(require("../../models/reporte"));
const connectionPoas_1 = __importDefault(require("../../db/connectionPoas"));
const menu_1 = __importDefault(require("../../models/menu"));
const sequelize_2 = __importDefault(require("sequelize"));
const vw_zonas_1 = __importDefault(require("../../models/Poas2000/vw_zonas"));
const fichasAlmacen_1 = __importDefault(require("../../models/Poas2000/fichasAlmacen"));
const ExcelJS = require("exceljs");
const listarchatSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let pDeUsuario_id = data.DeUsuario_id ? parseInt(data.DeUsuario_id) : null;
    let pParaUsuario_id = data.ParaUsuario_id
        ? parseInt(data.ParaUsuario_id)
        : null;
    const Query3 = yield mensaje_1.default.findAll({
        raw: true,
        attributes: [
            "IdMensaje",
            "DeUsuario_id",
            "ParaUsuario_id",
            "Mensaje",
            "FechaCreacion",
            "Estado_id",
        ],
        where: {
            Estado_id: "1",
            [sequelize_1.Op.or]: [
                {
                    DeUsuario_id: pDeUsuario_id,
                    ParaUsuario_id: pParaUsuario_id,
                },
                {
                    DeUsuario_id: pParaUsuario_id,
                    ParaUsuario_id: pDeUsuario_id,
                },
            ],
        },
        order: [["FechaCreacion", "ASC"]],
    });
    return Query3;
});
exports.listarchatSocket = listarchatSocket;
const crearMensajeSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let pDeUsuario_id = data.DeUsuario_id ? parseInt(data.DeUsuario_id) : null;
    let pParaUsuario_id = data.ParaUsuario_id
        ? parseInt(data.ParaUsuario_id)
        : null;
    let pMensaje = (_a = data.Mensaje) === null || _a === void 0 ? void 0 : _a.toString();
    const Query3 = yield mensaje_1.default.create({
        DeUsuario_id: pDeUsuario_id,
        ParaUsuario_id: pParaUsuario_id,
        Mensaje: pMensaje,
    });
    return Query3;
});
exports.crearMensajeSocket = crearMensajeSocket;
const listarUsuarioSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    usuario_1.default.belongsTo(entidad_1.default, { foreignKey: "Entidad_id" });
    const Query3 = yield usuario_1.default.findAll({
        raw: true,
        attributes: [
            "IdUsuario",
            "Usuario",
            "RutaImagen",
            "Entidad.Nombres",
            "Entidad.Apellidos",
            "Online",
            "Estado_id",
        ],
        include: [
            {
                model: entidad_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarUsuarioSocket = listarUsuarioSocket;
/**/
const listarReporte = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield reporte_1.default.findAll({
        raw: true,
        attributes: ["IdReporte", "Reporte", "Query", "TipoReporte", "Estado_id"],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarReporte = listarReporte;
const generarExcelReporte = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const reporte = yield reporte_1.default.findByPk(data.Reporte, {
        attributes: ["Query"],
        raw: true,
    });
    const query = reporte.Query;
    const dataResult = yield connectionPoas_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte");
    // Agregar encabezados de columnas
    worksheet.columns = Object.keys(dataResult[0]).map((key) => ({
        header: key,
        key,
        width: 20,
    }));
    // Agregar filas con los datos
    dataResult.forEach((row) => {
        worksheet.addRow(row);
    });
    // Escribir el archivo en un buffer
    const buffer = yield workbook.xlsx.writeBuffer();
    // Enviar el buffer al frontend
    return { buffer: buffer.toString("base64") };
});
exports.generarExcelReporte = generarExcelReporte;
const listarMenuxUsuarioxPerfil = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield menu_1.default.findAll({
        raw: true,
        where: {
            IdMenu: {
                [sequelize_1.Op.in]: [
                    sequelize_2.default.literal(`(SELECT Menu_id FROM MenuAsignado WHERE PerfilUsuario_id=(select Perfil_id from PerfilUsuario where Usuario_id=${data.Usuario_id} )) UNION
         (SELECT Menu_id FROM MenuAsignado WHERE Usuario_id=${data.Usuario_id})`),
                ],
            },
        },
    });
    return menus;
});
exports.listarMenuxUsuarioxPerfil = listarMenuxUsuarioxPerfil;
const PostlistarMenuxUsuarioxPerfil = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { pUsuario } = req.body;
    const Query3 = yield menu_1.default.findAll({
        raw: true,
        where: {
            IdMenu: {
                [sequelize_1.Op.in]: [
                    sequelize_2.default.literal(`(SELECT Menu_id FROM MenuAsignado WHERE PerfilUsuario_id=(select Perfil_id from PerfilUsuario where Usuario_id=${pUsuario} )) UNION
         (SELECT Menu_id FROM MenuAsignado WHERE Usuario_id=${pUsuario})`),
                ],
            },
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
exports.PostlistarMenuxUsuarioxPerfil = PostlistarMenuxUsuarioxPerfil;
//TENGO QUE REVISAR ESTO
const listarZonasSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield vw_zonas_1.default.findAll({
        raw: true,
        attributes: [
            "zona_id",
            "estadozona_id"
        ],
        where: {
            estadoZona_id: "1",
        },
    });
    return Query3;
});
exports.listarZonasSocket = listarZonasSocket;
const listarEquiposSiscardSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield fichasAlmacen_1.default.findAll({
        raw: true,
        attributes: [
            "almacen_id",
            "componente_id",
            "nExActuales"
        ],
        where: {
            almacen_id: data,
            componente_id: {
                [sequelize_1.Op.like]: 'sis-%'
            },
            nExActuales: {
                [sequelize_1.Op.gt]: 0 // condición para que sea mayor a 0
            }
        },
    });
    return Query3;
});
exports.listarEquiposSiscardSocket = listarEquiposSiscardSocket;
