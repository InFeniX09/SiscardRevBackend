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
exports.listarEquipoXAreaXClienteXTipoEquipo = exports.listarModeloXMarca = exports.listarMarcaXTipoEquipo = exports.listarModeloxMarca = exports.listarMarcaxTipoEquipo = exports.listarEquipoDescuentoSocket = exports.listarEquipoxClxTCSocket = exports.listarDescuentoSocket = exports.listarEquipoSocket = exports.crearEquipoStockSocket = exports.crearEquipoDescuentoSocket = exports.crearEquipoSocket = exports.crearModeloSocket = exports.crearMarcaSocket = exports.crearTipoEquipoSocket = exports.listarModeloSocket = exports.listarMarcaSocket = exports.listarTipoEquipoxClSocket = exports.listarTipoEquipoSocket = exports.listarClasificacionEquipoSocket = void 0;
const sequelize_1 = require("sequelize");
const marca_1 = __importDefault(require("../../models/marca"));
const tipoequipo_1 = __importDefault(require("../../models/tipoequipo"));
const modelo_1 = __importDefault(require("../../models/modelo"));
const equipo_1 = __importDefault(require("../../models/equipo"));
const cliente_1 = __importDefault(require("../../models/cliente"));
const equipodescuento_1 = __importDefault(require("../../models/equipodescuento"));
const equipostock_1 = __importDefault(require("../../models/equipostock"));
const equiposerie_1 = __importDefault(require("../../models/equiposerie"));
const equipocontrol_1 = __importDefault(require("../../models/equipocontrol"));
const area_1 = __importDefault(require("../../models/area"));
const estado_1 = __importDefault(require("../../models/estado"));
const listarClasificacionEquipoSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield tipoequipo_1.default.findAll({
        raw: true,
        attributes: [
            [sequelize_1.Sequelize.literal("DISTINCT TipoEquipo.Clasificacion"), "Clasificacion"],
        ],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarClasificacionEquipoSocket = listarClasificacionEquipoSocket;
const listarTipoEquipoSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield tipoequipo_1.default.findAll({
        raw: true,
        attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion"],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarTipoEquipoSocket = listarTipoEquipoSocket;
const listarTipoEquipoxClSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield tipoequipo_1.default.findAll({
        raw: true,
        attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado_id"],
        where: {
            Estado_id: "1",
            Clasificacion: data.Clasificacion,
        },
    });
    return Query3;
});
exports.listarTipoEquipoxClSocket = listarTipoEquipoxClSocket;
const listarMarcaSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "IdTipoEquipo" });
    const Query3 = yield marca_1.default.findAll({
        raw: true,
        attributes: ["IdMarca", "Marca", "Estado_id"],
        include: [
            {
                model: tipoequipo_1.default,
                attributes: ["TipoEquipo"],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarMarcaSocket = listarMarcaSocket;
const listarModeloSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "IdTipoEquipo" });
    const Query3 = yield modelo_1.default.findAll({
        raw: true,
        attributes: [
            "IdModelo",
            "Marca.TipoEquipo.TipoEquipo",
            "Marca.Marca",
            "Modelo",
            "Estado_id",
        ],
        include: [
            {
                model: marca_1.default,
                attributes: [],
                required: true,
                include: [{ model: tipoequipo_1.default, attributes: [], required: true }],
            },
        ],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarModeloSocket = listarModeloSocket;
const crearTipoEquipoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield tipoequipo_1.default.findOne({
        where: { TipoEquipo: data.TipoEquipo, Clasificacion: data.Clasificacion },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        const Query3 = yield tipoequipo_1.default.create({
            TipoEquipo: data.TipoEquipo,
            Clasificacion: data.Clasificacion,
        });
        return { msg: "NoExiste", data: Query3 };
    }
});
exports.crearTipoEquipoSocket = crearTipoEquipoSocket;
const crearMarcaSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield marca_1.default.findOne({
        where: { Marca: data.Marca, IdTipoEquipo: data.TipoEquipo },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        const Query3 = yield marca_1.default.create({
            Marca: data.Marca,
            IdTipoEquipo: data.TipoEquipo,
            Estado_id: "1",
        });
        return { msg: "NoExiste", data: Query3 };
    }
});
exports.crearMarcaSocket = crearMarcaSocket;
const crearModeloSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield modelo_1.default.findOne({
        where: { Modelo: data.Modelo, Marca_id: data.Marca },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        let cuotas = +data.Cuotas;
        const Query3 = yield modelo_1.default.create({
            Modelo: data.Modelo,
            Marca_id: data.Marca,
        });
        let precioInicial = +data.Costo;
        let precioFinal = precioInicial * cuotas;
        const Buscar = yield modelo_1.default.findOne({
            attributes: ["IdModelo"],
            where: {
                Modelo: data.Modelo,
                Marca_id: data.Marca,
            },
        });
        let idModelo = Buscar === null || Buscar === void 0 ? void 0 : Buscar.dataValues.IdModelo;
        for (let i = 1; i <= cuotas; i++) {
            equipodescuento_1.default.create({
                Modelo_id: idModelo,
                Tiempo: i,
                Precio: precioFinal
            });
            precioFinal = precioFinal - precioInicial;
        }
        return { msg: "TODO OK" };
    }
});
exports.crearModeloSocket = crearModeloSocket;
const crearEquipoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("datos traidos del form", data);
    const Query0 = yield equipo_1.default.findOne({
        where: {
            equipo_imei: data.Imei,
        },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        const Query3 = yield equipo_1.default.create({
            //data para agregar nuevo equipo
            id_marca: data.Marca,
            id_modelo: data.Modelo,
            equipo_imei: data.Imei,
            id_area: data.Area,
            id_cliente: data.Cliente,
            id_estado: "7",
        });
        return { msg: "NoExiste", data: Query3 };
    }
});
exports.crearEquipoSocket = crearEquipoSocket;
const crearEquipoDescuentoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraer el array de preciosPorMes del objeto data
        const test = data.test;
        // Mapear cada objeto dentro del array preciosPorMes y transformarlo según tus necesidades
        const equiposSerieJSON = test.map((item) => {
            return {
                Equipo_id: item.Equipo,
                Tiempo: item.Tiempo,
                Precio: item.Precio,
            };
        });
        // Insertar los datos masivamente usando Sequelize
        yield equipodescuento_1.default.bulkCreate(equiposSerieJSON);
        console.log("Carga masiva completada con éxito");
    }
    catch (error) {
        console.error("Error en la carga masiva:", error);
    }
});
exports.crearEquipoDescuentoSocket = crearEquipoDescuentoSocket;
const crearEquipoStockSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data.Clasificacion === "Seriado") {
            const test = data.test;
            console.log("yara1");
            const equiposSerieJSON = test.map((item) => {
                return {
                    Equipo_id: item.Equipo,
                    Serie: item.Serie,
                    Usuario_id: 5,
                    TiempoVida: 0,
                };
            });
            const insercionmasiva = yield equiposerie_1.default.bulkCreate(equiposSerieJSON);
            const equiposSerieJSON1 = insercionmasiva.map((item) => {
                return {
                    EquipoSerie_id: item.IdEquipoSerie,
                    Usuario_id: 5,
                    Observacion: "Ingreso de Stock por Software",
                };
            });
            yield equipocontrol_1.default.bulkCreate(equiposSerieJSON1);
            const stockActual = yield equipostock_1.default.findOne({
                where: { Equipo_id: data.test[0].Equipo, Usuario_id: 5 },
            });
            if (!stockActual) {
                yield equipostock_1.default.create({
                    StockDisponible: equiposSerieJSON.length,
                    StockNoDisponible: 0,
                    Equipo_id: data.test[0].Equipo,
                    Usuario_id: 5,
                });
            }
            else {
                yield equipostock_1.default.update({
                    StockDisponible: stockActual.StockDisponible + equiposSerieJSON.length,
                }, {
                    where: { Equipo_id: data.test[0].Equipo, Usuario_id: 5 },
                });
            }
        }
        else if (data.Clasificacion[0] === "Accesorio") {
            const stockActual = yield equipostock_1.default.findOne({
                where: { Equipo_id: data.IdEquipo, Usuario_id: 5 },
            });
            if (!stockActual) {
                yield equipostock_1.default.create({
                    StockDisponible: data.Cantidad,
                    StockNoDisponible: 0,
                    Equipo_id: data.IdEquipo,
                    Usuario_id: 5,
                });
            }
            else {
                yield equipostock_1.default.update({
                    StockDisponible: stockActual.StockDisponible + parseFloat(data.Cantidad),
                }, {
                    where: { Equipo_id: data.IdEquipo, Usuario_id: 5 },
                });
            }
        }
    }
    catch (error) {
        console.error("Error en la carga masiva:", error);
    }
});
exports.crearEquipoStockSocket = crearEquipoStockSocket;
const listarEquipoSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "id_cliente" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "id_modelo" });
    equipo_1.default.belongsTo(marca_1.default, { foreignKey: "id_marca" });
    equipo_1.default.belongsTo(area_1.default, { foreignKey: "id_area" });
    equipo_1.default.belongsTo(estado_1.default, { foreignKey: "id_estado" });
    const Query3 = yield equipo_1.default.findAll({
        attributes: ["id_equipo", "equipo_imei", "id_entidad"],
        include: [
            {
                model: modelo_1.default,
                attributes: ["Modelo"],
                required: true,
            },
            {
                model: cliente_1.default,
                attributes: ["CodCliente"],
                required: true,
            },
            {
                model: marca_1.default,
                attributes: ["Marca"],
                required: true,
            },
            {
                model: area_1.default,
                attributes: ["Area"],
                required: true,
            },
            {
                model: estado_1.default,
                attributes: ["CortoEstado"],
                required: true,
            },
        ],
    });
    const results = Query3.map((result) => {
        const plainResult = result.get({ plain: true });
        return Object.assign(Object.assign({}, plainResult), { id_equipo: plainResult.id_equipo, equipo_imei: plainResult.equipo_imei, Marca: plainResult.Marca.Marca, Modelo: plainResult.Modelo.Modelo, Estado: plainResult.Estado.CortoEstado, Area: plainResult.Area.Area, Cliente: plainResult.Cliente.CodCliente });
    });
    return results;
});
exports.listarEquipoSocket = listarEquipoSocket;
const listarDescuentoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equipodescuento_1.default.belongsTo(equipo_1.default, { foreignKey: "Modelo_id" });
    const Query3 = yield equipodescuento_1.default.findAll({
        attributes: ["IdEquipoDescuento", "Tiempo", "Precio"],
        where: {
            Modelo_id: data,
        },
        order: [["Tiempo", "ASC"]]
    });
    /*const results = Query3.map((result) => {
      const plainResult = result.get({ plain: true });
      return {
        ...plainResult,
        id_equipo: plainResult.id_equipo,
        equipo_imei: plainResult.equipo_imei,
        Marca: plainResult.Marca.Marca,
        Modelo: plainResult.Modelo.Modelo,
        Estado: plainResult.Estado.CortoEstado,
  
        Area: plainResult.Area.Area,
        Cliente: plainResult.Cliente.CodCliente,
      };
    });*/
    return Query3;
});
exports.listarDescuentoSocket = listarDescuentoSocket;
const listarEquipoxClxTCSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Modelo.Marca.Marca",
            "Modelo.Modelo",
            "Cliente.CodCliente",
            "Especificacion",
            "Gamma",
            "Estado_id",
        ],
        include: [
            {
                model: modelo_1.default,
                attributes: [],
                required: true,
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
                                where: { IdTipoEquipo: data.TipoEquipo },
                            },
                        ],
                    },
                ],
            },
            {
                model: cliente_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
            Cliente_id: data.Cliente,
        },
    });
    return Query3;
});
exports.listarEquipoxClxTCSocket = listarEquipoxClxTCSocket;
const listarEquipoDescuentoSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    equipodescuento_1.default.belongsTo(equipo_1.default, { foreignKey: "Equipo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    const Query3 = yield equipodescuento_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoDescuento",
            "Equipo.Modelo.Marca.Marca",
            "Equipo.Modelo.Modelo",
            "Equipo.Cliente.CodCliente",
            "Tiempo",
            "Precio",
            "Estado_id",
        ],
        include: [
            {
                model: equipo_1.default,
                attributes: [],
                required: true,
                include: [
                    {
                        model: modelo_1.default,
                        attributes: [],
                        required: true,
                        include: [
                            {
                                model: marca_1.default,
                                attributes: [],
                                required: true,
                                include: [
                                    { model: tipoequipo_1.default, attributes: [], required: true },
                                ],
                            },
                        ],
                    },
                    {
                        model: cliente_1.default,
                        attributes: [],
                        required: true,
                    },
                ],
            },
        ],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarEquipoDescuentoSocket = listarEquipoDescuentoSocket;
const listarMarcaxTipoEquipo = () => __awaiter(void 0, void 0, void 0, function* () {
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            [sequelize_1.Sequelize.literal("DISTINCT Modelo.Marca.IdMarca"), "IdMarca"],
            "Modelo.Marca.Marca",
            "Modelo.Marca.TipoEquipo.TipoEquipo",
            "Modelo.Marca.Estado",
        ],
        include: [
            {
                model: modelo_1.default,
                attributes: [],
                required: true,
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
                                    TipoEquipo: "Celular",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
        where: {
            Estado_id: "1",
            Cliente_id: "1",
        },
    });
    return Query3;
});
exports.listarMarcaxTipoEquipo = listarMarcaxTipoEquipo;
const listarModeloxMarca = () => __awaiter(void 0, void 0, void 0, function* () {
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            [sequelize_1.Sequelize.literal("DISTINCT Modelo.Marca.IdMarca"), "IdMarca"],
            "Modelo.Marca.Marca",
            "Modelo.Marca.TipoEquipo.TipoEquipo",
            "Modelo.Marca.Estado",
        ],
        include: [
            {
                model: modelo_1.default,
                attributes: [],
                required: true,
                include: [{ model: marca_1.default, attributes: [], required: true }],
            },
        ],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarModeloxMarca = listarModeloxMarca;
const listarMarcaXTipoEquipo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "IdTipoEquipo" });
    const Query3 = yield marca_1.default.findAll({
        raw: true,
        attributes: [
            "IdMarca",
            "TipoEquipo.Clasificacion",
            "TipoEquipo.TipoEquipo",
            "Marca",
            "Estado_id",
        ],
        include: [
            {
                model: tipoequipo_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
            IdTipoEquipo: data.TipoEquipo,
        },
    });
    return Query3;
});
exports.listarMarcaXTipoEquipo = listarMarcaXTipoEquipo;
const listarModeloXMarca = (data) => __awaiter(void 0, void 0, void 0, function* () {
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    const Query3 = yield modelo_1.default.findAll({
        raw: true,
        attributes: ["IdModelo", "Modelo", "Estado_id"],
        include: [
            {
                model: marca_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
            Marca_id: data.Marca,
        },
    });
    return Query3;
});
exports.listarModeloXMarca = listarModeloXMarca;
const listarEquipoXAreaXClienteXTipoEquipo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Modelo.Marca.Marca",
            "Modelo.Modelo",
            "Estado_id",
        ],
        include: [
            {
                model: modelo_1.default,
                attributes: [],
                required: true,
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
                                where: { IdTipoEquipo: data.TipoEquipo },
                            },
                        ],
                    },
                ],
            },
        ],
        where: {
            Estado_id: "1",
            Cliente_id: data.Cliente,
            Area_id: data.Area,
        },
    });
    return Query3;
});
exports.listarEquipoXAreaXClienteXTipoEquipo = listarEquipoXAreaXClienteXTipoEquipo;
