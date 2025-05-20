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
exports.crearproveedor = exports.crearcliente = exports.crearmodelo = exports.crearmarca = exports.creartipoequipo = exports.crearequipodescuento = exports.crearequipocontrol = exports.crearequipo = exports.listartipomenu = exports.listarmenu = exports.listarpersona = exports.listarusuario = exports.listarcolor = exports.listarproveedor = exports.listarcliente = void 0;
const express_1 = require("express");
const menu_1 = __importDefault(require("../models/menu"));
const usuario_1 = __importDefault(require("../models/usuario"));
const equipo_1 = __importDefault(require("../models/equipo"));
const proveedor_1 = __importDefault(require("../models/proveedor"));
const marca_1 = __importDefault(require("../models/marca"));
const modelo_1 = __importDefault(require("../models/modelo"));
const tipoequipo_1 = __importDefault(require("../models/tipoequipo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const equipocontrol_1 = __importDefault(require("../models/equipocontrol"));
const sequelize_1 = require("sequelize");
const equipodescuento_1 = __importDefault(require("../models/equipodescuento"));
const tipomenu_1 = __importDefault(require("../models/tipomenu"));
const color_1 = __importDefault(require("../models/color"));
const entidad_1 = __importDefault(require("../models/entidad"));
const tipodocumento_1 = __importDefault(require("../models/tipodocumento"));
const area_1 = __importDefault(require("../models/area"));
const puesto_1 = __importDefault(require("../models/puesto"));
const listarcliente = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield cliente_1.default.findAll({
        raw: true,
        attributes: ["IdCliente", "Cliente", "Cliente.Estado_id"],
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
exports.listarcliente = listarcliente;
const listarproveedor = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield proveedor_1.default.findAll({
        raw: true,
        attributes: ["IdProveedor", "Proveedor", "Proveedor.Estado"],
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
exports.listarproveedor = listarproveedor;
const listarcolor = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield color_1.default.findAll({
        raw: true,
        attributes: ["IdColor", "Color", "Codigo", "Estado_id"],
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
exports.listarcolor = listarcolor;
/**/
const listarusuario = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield usuario_1.default.findAll({
        raw: true,
        attributes: [
            "IdUsuario",
            "Usuario",
            "Correo",
            "Telefono",
            "FcIngreso",
            "FcBaja",
            "Estado_id",
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
exports.listarusuario = listarusuario;
const listarpersona = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    entidad_1.default.belongsTo(tipodocumento_1.default, { foreignKey: "idTipoDocumento" });
    entidad_1.default.belongsTo(area_1.default, { foreignKey: "idArea" });
    entidad_1.default.belongsTo(puesto_1.default, { foreignKey: "idPuesto" });
    const Query3 = yield entidad_1.default.findAll({
        raw: true,
        attributes: [
            "IdPersona",
            "Nombres",
            "Apellidos",
            "TipoDocumento.TipoDocumento",
            "NroDocumento",
            "Correo",
            "Genero",
            "FcNacimiento",
            "Telefono",
            "Area.Area",
            "Puesto.Puesto",
            "Estado_id",
        ],
        include: [
            {
                model: tipodocumento_1.default,
                attributes: [],
                required: true,
            },
            {
                model: area_1.default,
                attributes: [],
                required: true,
            },
            {
                model: puesto_1.default,
                attributes: [],
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
exports.listarpersona = listarpersona;
/**/
const listarmenu = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { pidTipoMenu, pidPadre } = req.query;
    menu_1.default.belongsTo(tipomenu_1.default, { foreignKey: "idTipoMenu" });
    const Query3 = yield menu_1.default.findAll({
        attributes: [
            "IdMenu",
            "Menu",
            "Ruta",
            "RutaImagen",
            "Comando",
            "TipoMenu.TipoMenu",
            "idPadre",
            "Estado_id",
        ],
        include: [
            {
                model: tipomenu_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
            idTipoMenu: {
                [sequelize_1.Op.like]: pidTipoMenu
                    ? sequelize_1.Sequelize.literal(`ISNULL('${pidTipoMenu}', '%')`)
                    : "%",
            },
            idPadre: {
                [sequelize_1.Op.like]: pidPadre
                    ? sequelize_1.Sequelize.literal(`ISNULL('${pidPadre}', '%')`)
                    : "%",
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
exports.listarmenu = listarmenu;
const listartipomenu = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield tipomenu_1.default.findAll({
        attributes: ["IdTipoMenu", "TipoMenu", "Estado_id"],
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
exports.listartipomenu = listartipomenu;
/*CREAR*/
const crearequipo = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let pMarca = (_a = req.body.Marca) === null || _a === void 0 ? void 0 : _a.toString();
    let pModelo = (_b = req.body.Modelo) === null || _b === void 0 ? void 0 : _b.toString();
    let pCliente = (_c = req.body.Cliente) === null || _c === void 0 ? void 0 : _c.toString();
    let pEspecificacion = (_d = req.body.Especificacion) === null || _d === void 0 ? void 0 : _d.toString();
    const Query3 = yield equipo_1.default.create({
        idMarca: pMarca,
        idModelo: pModelo,
        idCliente: pCliente,
        Especificacion: pEspecificacion,
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
exports.crearequipo = crearequipo;
const crearequipocontrol = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l;
    let Equipo = (_e = req.body.idEquipo) === null || _e === void 0 ? void 0 : _e.toString();
    let Serie = (_f = req.body.Serie) === null || _f === void 0 ? void 0 : _f.toString();
    let Identificacion = (_g = req.body.Identificacion) === null || _g === void 0 ? void 0 : _g.toString();
    let TiempoVida = (_h = req.body.TiempoVida) === null || _h === void 0 ? void 0 : _h.toString();
    let Proveedor = (_j = req.body.idProveedor) === null || _j === void 0 ? void 0 : _j.toString();
    let FcIngreso = req.body.FcIngreso;
    let Observacion = (_k = req.body.Observacion) === null || _k === void 0 ? void 0 : _k.toString();
    let Estado = (_l = req.body.Estado) === null || _l === void 0 ? void 0 : _l.toString();
    const Query3 = yield equipocontrol_1.default.create({
        idEquipo: Equipo,
        Serie: Serie,
        Identificacion: Identificacion,
        TiempoVida: TiempoVida,
        idUsuario: "1",
        idProveedor: Proveedor,
        FcIngreso: FcIngreso,
        Observacion: Observacion,
        Estado_id: Estado,
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
exports.crearequipocontrol = crearequipocontrol;
const crearequipodescuento = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    let resultado = req.body.resultado;
    yield equipodescuento_1.default.bulkCreate(resultado);
    res.status(200).json({ message: "Inserción masiva completada." });
});
exports.crearequipodescuento = crearequipodescuento;
const creartipoequipo = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o;
    let pTipoEquipo = (_m = req.body.TipoEquipo) === null || _m === void 0 ? void 0 : _m.toString();
    let pClasificacion = (_o = req.body.Clasificacion) === null || _o === void 0 ? void 0 : _o.toString();
    const Query3 = yield tipoequipo_1.default.create({
        TipoEquipo: pTipoEquipo,
        Clasificacion: pClasificacion,
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
exports.creartipoequipo = creartipoequipo;
const crearmarca = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q;
    let pTipoEquipo = (_p = req.body.TipoEquipo) === null || _p === void 0 ? void 0 : _p.toString();
    let pMarca = (_q = req.body.Marca) === null || _q === void 0 ? void 0 : _q.toString();
    const Query3 = yield marca_1.default.create({
        Marca: pMarca,
        idTipoEquipo: pTipoEquipo,
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
exports.crearmarca = crearmarca;
const crearmodelo = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _r, _s;
    let pMarca = (_r = req.body.Marca) === null || _r === void 0 ? void 0 : _r.toString();
    let pModelo = (_s = req.body.Modelo) === null || _s === void 0 ? void 0 : _s.toString();
    const Query3 = yield modelo_1.default.create({
        idMarca: pMarca,
        Modelo: pModelo,
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
exports.crearmodelo = crearmodelo;
const crearcliente = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _t;
    let pcliente = (_t = req.body.Cliente) === null || _t === void 0 ? void 0 : _t.toString();
    const Query3 = yield cliente_1.default.create({
        Cliente: pcliente,
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
exports.crearcliente = crearcliente;
const crearproveedor = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _u;
    let pproveedor = (_u = req.body.Proveedor) === null || _u === void 0 ? void 0 : _u.toString();
    const Query3 = yield proveedor_1.default.create({
        Proveedor: pproveedor,
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
exports.crearproveedor = crearproveedor;
