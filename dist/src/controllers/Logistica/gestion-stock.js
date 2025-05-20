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
exports.listarEquipoxClasificacionSocket = exports.cargaMasivaEquipoSocket = exports.listarEquipoSerieSocket = exports.listarEquipoControlSocket = exports.listarEquipoSerieXIdEquipoStock = exports.listarEquipoStockSocket = void 0;
const marca_1 = __importDefault(require("../../models/marca"));
const equipostock_1 = __importDefault(require("../../models/equipostock"));
const usuario_1 = __importDefault(require("../../models/usuario"));
const equipo_1 = __importDefault(require("../../models/equipo"));
const modelo_1 = __importDefault(require("../../models/modelo"));
const cliente_1 = __importDefault(require("../../models/cliente"));
const equipocontrol_1 = __importDefault(require("../../models/equipocontrol"));
const equiposerie_1 = __importDefault(require("../../models/equiposerie"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const area_1 = __importDefault(require("../../models/area"));
const tipoequipo_1 = __importDefault(require("../../models/tipoequipo"));
const estado_1 = __importDefault(require("../../models/estado"));
const listarEquipoStockSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    equipostock_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    equipostock_1.default.belongsTo(equipo_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    const Query3 = yield equipostock_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoStock",
            "Equipo.Cliente.CodCliente",
            "Equipo.Modelo.Marca.Marca",
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
                required: true,
            },
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
        where: {},
    });
    return Query3;
});
exports.listarEquipoStockSocket = listarEquipoStockSocket;
const listarEquipoSerieXIdEquipoStock = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equiposerie_1.default.belongsTo(equipostock_1.default, { foreignKey: "Equipo_id" });
    equipostock_1.default.hasMany(equiposerie_1.default, { foreignKey: "Equipo_id" });
    equiposerie_1.default.belongsTo(estado_1.default, { foreignKey: "Estado_id" });
    const Query3 = yield equiposerie_1.default.findAll({
        raw: true,
        attributes: ["IdEquipoSerie", "Serie"],
        include: [
            {
                model: equipostock_1.default,
                attributes: [],
                required: true,
                where: { IdEquipoStock: data.IdEquipoStock },
            },
            {
                model: estado_1.default,
                attributes: [],
                required: true,
            },
        ],
    });
    return Query3;
});
exports.listarEquipoSerieXIdEquipoStock = listarEquipoSerieXIdEquipoStock;
const listarEquipoControlSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    equipocontrol_1.default.belongsTo(equiposerie_1.default, { foreignKey: "EquipoSerie_id" });
    equipocontrol_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    equiposerie_1.default.belongsTo(equipo_1.default, { foreignKey: "Equipo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    const Query3 = yield equipocontrol_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoControl",
            "EquipoSerie.Equipo.Cliente.CodCliente",
            "EquipoSerie.Equipo.Modelo.Marca.Marca",
            "EquipoSerie.Equipo.Modelo.Modelo",
            "EquipoSerie.Serie",
            "Usuario.Usuario",
            "FcMovimiento",
            "Observacion",
            "Estado_id",
        ],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: true,
            },
            {
                model: equiposerie_1.default,
                attributes: [],
                required: true,
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
            },
        ],
        where: {},
    });
    return Query3;
});
exports.listarEquipoControlSocket = listarEquipoControlSocket;
const listarEquipoSerieSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    equiposerie_1.default.belongsTo(equipo_1.default, { foreignKey: "Equipo_id" });
    equiposerie_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    const Query3 = yield equiposerie_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipoSerie",
            "Equipo.Cliente.CodCliente",
            "Equipo.Modelo.Marca.Marca",
            "Equipo.Modelo.Modelo",
            "Usuario.Usuario",
            "Serie",
            "Estado_id",
        ],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: true,
            },
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
        where: {},
    });
    return Query3;
});
exports.listarEquipoSerieSocket = listarEquipoSerieSocket;
const cargaMasivaEquipoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recopila todos los nombres de marca,modelo,estado
        const clientesUnicos = [
            ...new Set(data.map((item) => item.CodCliente)),
        ];
        const marcasUnicas = [
            ...new Set(data.map((item) => item.Marca)),
        ];
        const modelosUnicos = [
            ...new Set(data.map((item) => item.Modelo)),
        ];
        const areasUnicas = [...new Set(data.map((item) => item.Area))];
        const estadosUnicos = [
            ...new Set(data.map((item) => item.LargoEstado)),
        ];
        // Obtiene los IDs de Marca y Modelo
        const [clientes, marcas, modelos, areas, estados] = yield Promise.all([
            obtenerIdsCliente(clientesUnicos),
            obtenerIdsMarca(marcasUnicas),
            obtenerIdsModelo(modelosUnicos),
            obtenerIdsArea(areasUnicas),
            obtenerEstados(estadosUnicos),
        ]);
        // Crea un mapa para facilitar la búsqueda
        const clienteMap = new Map(clientes.map((cliente) => [cliente.CodCliente, cliente.IdCliente]));
        const marcaMap = new Map(marcas.map((marca) => [marca.Marca, marca.IdMarca]));
        const modeloMap = new Map(modelos.map((modelo) => [modelo.Modelo, modelo.IdModelo]));
        const areaMap = new Map(areas.map((area) => [area.Area, area.IdArea]));
        const estadoMap = new Map(estados.map((estado) => [estado.LargoEstado, estado.IdEstado]));
        // Obtiene los IDs de los equipos
        const equipos = yield obtenerIdsEquipo();
        // Crea un mapa para facilitar la búsqueda
        const equipoMap = new Map(equipos.map((equipo) => [
            `${equipo.Cliente_id}-${equipo.Modelo_id}-${equipo.Area_id}`,
            equipo.IdEquipo,
        ]));
        console.log('exe', equipoMap);
        // Recorre los datos y crea el nuevo JSON
        const equiposSerieJSON = data.map((item) => {
            const today = (0, moment_timezone_1.default)(item.FcIngreso).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
            const clienteId = clienteMap.get(item.CodCliente);
            const marcaId = marcaMap.get(item.Marca);
            const modeloId = modeloMap.get(item.Modelo);
            const areaId = areaMap.get(item.Area);
            const estados = estadoMap.get(item.LargoEstado);
            const equipoId = equipoMap.get(`${clienteId}-${modeloId}-${areaId}`);
            return {
                Equipo_id: equipoId,
                Usuario_id: 5,
                Serie: item.Serie,
                Identificador: item.Identificador,
                FcIngreso: today,
                Estado_id: estados,
            };
        });
        //Final (Ingreso SERIES)
        const insercionmasiva = yield equiposerie_1.default.bulkCreate(equiposSerieJSON);
        const equiposSerieJSON1 = insercionmasiva.map((item) => {
            return {
                EquipoSerie_id: item.IdEquipoSerie,
                Usuario_id: 5,
                Observacion: "Ingreso de Stock por Software",
            };
        });
        //Final (Ingreso Control)
        const insercionmasiva1 = yield equipocontrol_1.default.bulkCreate(equiposSerieJSON1);
        console.log("infe", equiposSerieJSON);
        const stockPorEquipoId = {};
        // Iteramos sobre el array equiposSerieJSON para contar la cantidad de elementos por Equipo_id
        equiposSerieJSON.forEach((item) => {
            const { Equipo_id } = item;
            if (stockPorEquipoId[Equipo_id]) {
                stockPorEquipoId[Equipo_id] += 1; // Puedes sumar la cantidad que desees aquí
            }
            else {
                stockPorEquipoId[Equipo_id] = 1; // Puedes inicializar la cantidad con el valor que desees aquí
            }
        });
        const nuevoArray = Object.entries(stockPorEquipoId).map(([Equipo_id, cantidad]) => ({ Equipo_id: parseInt(Equipo_id), cantidad }));
        // Ahora nuevoArray contiene la cantidad de stock por Equipo_id
        console.log("carnal", nuevoArray);
        nuevoArray.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            const stockActual = yield equipostock_1.default.findOne({
                where: { Equipo_id: element.Equipo_id, Usuario_id: 5 },
            });
            if (!stockActual) {
                yield equipostock_1.default.create({
                    StockDisponible: element.cantidad,
                    StockNoDisponible: 0,
                    Equipo_id: element.Equipo_id,
                    Usuario_id: 5,
                });
            }
            else {
                yield equipostock_1.default.update({
                    StockDisponible: stockActual.StockDisponible + element.cantidad,
                }, {
                    where: { Equipo_id: element.Equipo_id, Usuario_id: 5 },
                });
            }
        }));
    }
    catch (error) {
        console.error("Error en la carga masiva:", error);
    }
});
exports.cargaMasivaEquipoSocket = cargaMasivaEquipoSocket;
const obtenerIdsEquipo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield equipo_1.default.findAll({
            raw: true,
            attributes: ["IdEquipo", "Cliente_id", "Modelo_id", "Area_id"],
        });
        console.log("snow", equipos);
        return equipos.map((equipo) => ({
            Cliente_id: equipo.Cliente_id,
            Area_id: equipo.Area_id,
            Modelo_id: equipo.Modelo_id,
            IdEquipo: equipo.IdEquipo,
        }));
    }
    catch (error) {
        console.error("Error al obtener los IDs de los equipos:", error);
        return [];
    }
});
const obtenerIdsCliente = (clientes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcasEnDB = yield cliente_1.default.findAll({
            where: { CodCliente: clientes },
        });
        return marcasEnDB.map((cliente) => ({
            CodCliente: cliente.CodCliente,
            IdCliente: cliente.IdCliente,
        }));
    }
    catch (error) {
        console.error("Error al obtener los IDs de las marcas:", error);
        return [];
    }
});
const obtenerIdsMarca = (marcas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcasEnDB = yield marca_1.default.findAll({ where: { Marca: marcas } });
        return marcasEnDB.map((marca) => ({
            Marca: marca.Marca,
            IdMarca: marca.IdMarca,
        }));
    }
    catch (error) {
        console.error("Error al obtener los IDs de las marcas:", error);
        return [];
    }
});
const obtenerIdsModelo = (modelos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modelosEnDB = yield modelo_1.default.findAll({ where: { Modelo: modelos } });
        return modelosEnDB.map((modelo) => ({
            Modelo: modelo.Modelo,
            IdModelo: modelo.IdModelo,
        }));
    }
    catch (error) {
        console.error("Error al obtener los IDs de los modelos:", error);
        return [];
    }
});
const obtenerEstados = (estados) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadosEnDB = yield estado_1.default.findAll({
            where: { Agrupamiento: "Equipo", LargoEstado: estados },
        });
        return estadosEnDB.map((estado) => ({
            LargoEstado: estado.LargoEstado,
            IdEstado: estado.IdEstado,
        }));
    }
    catch (error) {
        console.error("Error al obtener los IDs de los estados:", error);
        return [];
    }
});
const obtenerIdsArea = (areas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modelosEnDB = yield area_1.default.findAll({ where: { Area: areas } });
        return modelosEnDB.map((area) => ({
            Area: area.Area,
            IdArea: area.IdArea,
        }));
    }
    catch (error) {
        console.error("Error al obtener los IDs de los modelos:", error);
        return [];
    }
});
const listarEquipoxClasificacionSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Cliente.CodCliente",
            "Modelo.Marca.Marca",
            "Modelo.Modelo",
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
                        include: [{ model: tipoequipo_1.default, attributes: [], required: true }],
                    },
                ],
            },
            {
                model: cliente_1.default,
                attributes: [],
                required: true,
            },
        ],
    });
    return Query3;
});
exports.listarEquipoxClasificacionSocket = listarEquipoxClasificacionSocket;
