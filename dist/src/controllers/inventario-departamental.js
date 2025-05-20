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
exports.listarEquipoDescuento = exports.listarEquipoControl = exports.listarEquipoStock = exports.listarEquipo = exports.listarTipoEquipo = exports.listarModelo = exports.listarMarca = void 0;
const express_1 = require("express");
const sequelize_1 = require("sequelize");
const usuario_1 = __importDefault(require("../models/usuario"));
const equipo_1 = __importDefault(require("../models/equipo"));
const marca_1 = __importDefault(require("../models/marca"));
const tipoequipo_1 = __importDefault(require("../models/tipoequipo"));
const modelo_1 = __importDefault(require("../models/modelo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const equipostock_1 = __importDefault(require("../models/equipostock"));
const equipocontrol_1 = __importDefault(require("../models/equipocontrol"));
const proveedor_1 = __importDefault(require("../models/proveedor"));
const equipodescuento_1 = __importDefault(require("../models/equipodescuento"));
//Listo
const listarMarca = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pIdTipoEquipo } = req.query;
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "idTipoEquipo" });
    const Query3 = yield marca_1.default.findAll({
        raw: true,
        attributes: [
            "IdMarca",
            "Marca",
            "TipoEquipo.TipoEquipo",
            "TipoEquipo.Clasificacion",
            "Marca.Estado",
        ],
        include: [
            {
                model: tipoequipo_1.default,
                attributes: [],
                required: true,
                where: {
                    IdTipoEquipo: {
                        [sequelize_1.Op.like]: pIdTipoEquipo
                            ? sequelize_1.Sequelize.literal(`ISNULL('${pIdTipoEquipo}', '%')`)
                            : "%",
                    },
                },
            },
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
exports.listarMarca = listarMarca;
const listarModelo = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pIdMarca, pIdTipoEquipo } = req.query;
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "idMarca" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "idTipoEquipo" });
    const Query3 = yield modelo_1.default.findAll({
        raw: true,
        attributes: [
            "IdModelo",
            "Modelo",
            "Marca.Marca",
            "Marca.TipoEquipo.TipoEquipo",
            "Marca.TipoEquipo.Clasificacion",
            "Modelo.Estado",
        ],
        include: [
            {
                model: marca_1.default,
                attributes: [],
                required: true,
                where: {
                    IdMarca: {
                        [sequelize_1.Op.like]: pIdMarca
                            ? sequelize_1.Sequelize.literal(`ISNULL('${pIdMarca}', '%')`)
                            : "%",
                    },
                },
                include: [
                    {
                        model: tipoequipo_1.default,
                        attributes: [],
                        required: true,
                        where: {
                            IdTipoEquipo: {
                                [sequelize_1.Op.like]: pIdTipoEquipo
                                    ? sequelize_1.Sequelize.literal(`ISNULL('${pIdTipoEquipo}', '%')`)
                                    : "%",
                            },
                        },
                    },
                ],
            },
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
exports.listarModelo = listarModelo;
const listarTipoEquipo = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pClasificacion } = req.query;
    const Query3 = yield tipoequipo_1.default.findAll({
        raw: true,
        attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado_id"],
        where: {
            Clasificacion: {
                [sequelize_1.Op.like]: pClasificacion
                    ? sequelize_1.Sequelize.literal(`ISNULL('${pClasificacion}', '%')`)
                    : "%",
            },
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
exports.listarTipoEquipo = listarTipoEquipo;
const listarEquipo = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pIdTipoEquipo, pClasificacion } = req.query;
    equipo_1.default.belongsTo(marca_1.default, { foreignKey: "idMarca" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "idModelo" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "idCliente" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "idTipoEquipo" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Cliente.CodCliente",
            "Marca.Marca",
            "Modelo.Modelo",
            "Especificacion",
            "Estado_id",
        ],
        where: {
            Estado_id: "1",
        },
        include: [
            {
                model: marca_1.default,
                attributes: [],
                required: true,
                include: [
                    {
                        model: tipoequipo_1.default,
                        attributes: [],
                        required: true,
                        where: {
                            IdTipoEquipo: {
                                [sequelize_1.Op.like]: pIdTipoEquipo
                                    ? sequelize_1.Sequelize.literal(`ISNULL('${pIdTipoEquipo}', '%')`)
                                    : "%",
                            },
                            Clasificacion: {
                                [sequelize_1.Op.like]: pClasificacion
                                    ? sequelize_1.Sequelize.literal(`ISNULL('${pClasificacion}', '%')`)
                                    : "%",
                            },
                        },
                    },
                ],
            },
            {
                model: modelo_1.default,
                attributes: [],
                required: true,
            },
            {
                model: cliente_1.default,
                attributes: [],
                required: true,
            },
        ],
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
exports.listarEquipo = listarEquipo;
const listarEquipoStock = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pUsuario, pClasificacion } = req.query;
    equipostock_1.default.belongsTo(usuario_1.default, { foreignKey: "idUsuario" });
    equipostock_1.default.belongsTo(equipo_1.default, { foreignKey: "idEquipo" });
    equipo_1.default.belongsTo(marca_1.default, { foreignKey: "idMarca" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "idModelo" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "idCliente" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "idTipoEquipo" });
    const Query3 = yield equipostock_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoStock",
            "Equipo.Cliente.CodCliente",
            "Equipo.Marca.Marca",
            "Equipo.Modelo.Modelo",
            "Usuario.Usuario",
            "StockActual",
            "StockDisponible",
            "StockNoDisponible",
        ],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: false,
                where: {
                    Usuario: {
                        [sequelize_1.Op.like]: pUsuario
                            ? sequelize_1.Sequelize.literal(`ISNULL('${pUsuario}', '%')`)
                            : "%",
                    },
                },
            },
            {
                model: equipo_1.default,
                attributes: [],
                include: [
                    {
                        model: marca_1.default,
                        attributes: [],
                        include: [
                            {
                                model: tipoequipo_1.default,
                                attributes: [],
                                required: true,
                                where: {
                                    Clasificacion: {
                                        [sequelize_1.Op.like]: pClasificacion
                                            ? sequelize_1.Sequelize.literal(`ISNULL('${pClasificacion}', '%')`)
                                            : "%",
                                    },
                                },
                            },
                        ],
                        required: true,
                    },
                    {
                        model: modelo_1.default,
                        attributes: [],
                        required: true,
                    },
                    {
                        model: cliente_1.default,
                        attributes: [],
                        required: true,
                    },
                ],
                required: true,
            },
        ],
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
exports.listarEquipoStock = listarEquipoStock;
const listarEquipoControl = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    equipocontrol_1.default.belongsTo(usuario_1.default, { foreignKey: "idUsuario" });
    equipocontrol_1.default.belongsTo(equipo_1.default, { foreignKey: "idEquipo" });
    equipocontrol_1.default.belongsTo(proveedor_1.default, { foreignKey: "idProveedor" });
    equipo_1.default.belongsTo(marca_1.default, { foreignKey: "idMarca" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "idModelo" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "idCliente" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "idTipoEquipo" });
    const Query3 = yield equipocontrol_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoControl",
            "Equipo.Cliente.CodCliente",
            "Equipo.Marca.Marca",
            "Equipo.Modelo.Modelo",
            "Serie",
            "Identificacion",
            "TiempoVida",
            "Proveedor.Proveedor",
            "FcIngreso",
            "Usuario.Usuario",
            "FcAsignado",
            "FcBaja",
            "Estado_id",
        ],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: false,
            },
            {
                model: equipo_1.default,
                attributes: [],
                include: [
                    {
                        model: marca_1.default,
                        attributes: [],
                        include: [
                            {
                                model: tipoequipo_1.default,
                                attributes: [],
                                required: true,
                                where: {},
                            },
                        ],
                        required: true,
                    },
                    {
                        model: modelo_1.default,
                        attributes: [],
                        required: true,
                    },
                    {
                        model: cliente_1.default,
                        attributes: [],
                        required: true,
                    },
                ],
                required: true,
            },
            {
                model: proveedor_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {},
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
exports.listarEquipoControl = listarEquipoControl;
const listarEquipoDescuento = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    equipodescuento_1.default.belongsTo(equipo_1.default, { foreignKey: "idEquipo" });
    equipo_1.default.belongsTo(marca_1.default, { foreignKey: "idMarca" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "idModelo" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "idTipoEquipo" });
    const Query3 = yield equipodescuento_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoDescuento",
            "Equipo.Marca.Marca",
            "Equipo.Modelo.Modelo",
            "Precio",
            "Tiempo",
            "Estado_id",
        ],
        include: [
            {
                model: equipo_1.default,
                attributes: [],
                include: [
                    {
                        model: marca_1.default,
                        attributes: [],
                        include: [
                            {
                                model: tipoequipo_1.default,
                                attributes: [],
                                required: true,
                                where: {},
                            },
                        ],
                        required: true,
                    },
                    {
                        model: modelo_1.default,
                        attributes: [],
                        required: true,
                    },
                ],
                required: true,
            },
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
exports.listarEquipoDescuento = listarEquipoDescuento;
