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
exports.listarDatosPdfAlbaranSalida = exports.listarDetalleAlbaranSalida = exports.listarAlbaranSalidaxZona = exports.listarAlbaranes = exports.listarAlmacenxAlbaranSalida = void 0;
const express_1 = require("express");
const VW_SR_AlmacenxAlbaranSalida_1 = __importDefault(require("../../models/Poas2000/vistas/VW_SR_AlmacenxAlbaranSalida"));
const albaranes_1 = __importDefault(require("../../models/Poas2000/albaranes"));
const connectionPoas_1 = __importDefault(require("../../db/connectionPoas"));
const transitosalida_1 = __importDefault(require("../../models/Poas2000/transitosalida"));
const sequelize_1 = require("sequelize");
const almacenes_1 = __importDefault(require("../../models/Poas2000/almacenes"));
const zonas_1 = __importDefault(require("../../models/Poas2000/zonas"));
const clientes_1 = __importDefault(require("../../models/Poas2000/clientes"));
const componentes_1 = __importDefault(require("../../models/Poas2000/componentes"));
const listarAlmacenxAlbaranSalida = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const Query3 = yield VW_SR_AlmacenxAlbaranSalida_1.default.findAll({
        raw: true,
        order: [["almacen_id", "ASC"]],
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
exports.listarAlmacenxAlbaranSalida = listarAlmacenxAlbaranSalida;
const listarAlbaranes = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const Query3 = yield albaranes_1.default.findAll({
        raw: true,
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
exports.listarAlbaranes = listarAlbaranes;
const listarAlbaranSalidaxZona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { zona_id } = req.body; // Obtén el valor de idTipoMarca de la consulta
        const [results, metadata] = yield connectionPoas_1.default.query("EXEC SP_SR_AlbaranSalidaxZona :zona_id", {
            replacements: { zona_id }, // Pasar el valor del parámetro
        });
        const formatDate = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleString();
        };
        // Extrae la lista de marcas del resultado
        const selectmarca = results.map((result) => ({
            albaran_id: result.albaran_id,
            dFcGeneracion: formatDate(result.dFcGeneracion),
            usuario_id: result.usuario_id,
            dFcUltimaImpresion: formatDate(result.dFcUltimaImpresion),
        }));
        res.json(selectmarca);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Ocurrió un error al obtener las marcas.",
        });
    }
});
exports.listarAlbaranSalidaxZona = listarAlbaranSalidaxZona;
const listarDetalleAlbaranSalida = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { palbaran_id } = req.body;
    transitosalida_1.default.belongsTo(componentes_1.default, { foreignKey: "componente_id" });
    const Query3 = yield transitosalida_1.default.findAll({
        raw: true,
        attributes: [
            "nComponentes",
            "componente.sDsComponente",
            [sequelize_1.Sequelize.literal("CASE WHEN sNmSerie='1' THEN '' ELSE sNmSerie END"), "sNmSerie"]
        ],
        include: [
            {
                model: componentes_1.default,
                attributes: [],
                required: true,
            }
        ],
        where: {
            albaran_id: palbaran_id
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
exports.listarDetalleAlbaranSalida = listarDetalleAlbaranSalida;
const listarDatosPdfAlbaranSalida = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { palmacen_id } = req.body;
    almacenes_1.default.belongsTo(zonas_1.default, { foreignKey: "almacen_id" });
    almacenes_1.default.belongsTo(clientes_1.default, { foreignKey: "cliente_id" });
    const Query3 = yield almacenes_1.default.findAll({
        raw: true,
        attributes: [
            "Cliente.sDsDireccion",
            "Cliente.sDsCliente",
            "Cliente.sDsNif",
            "Zona.sDsZona",
            "Zona.sDsNIF",
        ],
        include: [
            {
                model: zonas_1.default,
                attributes: [],
                required: true,
            },
            {
                model: clientes_1.default,
                attributes: [],
                required: true,
            }
        ],
        where: {
            almacen_id: palmacen_id,
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
exports.listarDatosPdfAlbaranSalida = listarDatosPdfAlbaranSalida;
