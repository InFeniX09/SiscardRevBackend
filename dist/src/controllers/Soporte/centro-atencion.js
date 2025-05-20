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
exports.listarDatosSolicitud = exports.listarSolicitudXId = exports.listarPuesto = exports.listarPrioridad = exports.listarArea = exports.listarAreaSocket = exports.listarTipoDocumento = exports.armarPdfSolicitudSocket = exports.listarAccesorioxClxTexUsuSocket = exports.listarEquipoxClxTexUsuSocket = exports.asignarEquipos = exports.areaUsuario = exports.listarTicketResponsable = exports.actualizarResponsableTicket = exports.crearTicketSocket = exports.listarTicketTodosSocket = exports.listarTicketPersonalSocket = exports.listarIdEntidad = exports.crearSolicitudSocket = exports.listarTodosSolicitud = exports.listarPersonalSolicitud = exports.listarTipoMotivoSocket = exports.listarTipoSolicitudSocket = void 0;
const usuario_1 = __importDefault(require("../../models/usuario"));
const entidad_1 = __importDefault(require("../../models/entidad"));
const sequelize_1 = require("sequelize");
const tiposolicitud_1 = __importDefault(require("../../models/tiposolicitud"));
const tipomotivo_1 = __importDefault(require("../../models/tipomotivo"));
const solicitud_1 = __importDefault(require("../../models/solicitud"));
const ticket_1 = __importDefault(require("../../models/ticket"));
const equipo_1 = __importDefault(require("../../models/equipo"));
const marca_1 = __importDefault(require("../../models/marca"));
const modelo_1 = __importDefault(require("../../models/modelo"));
const cliente_1 = __importDefault(require("../../models/cliente"));
const equipostock_1 = __importDefault(require("../../models/equipostock"));
const equiposerie_1 = __importDefault(require("../../models/equiposerie"));
const tipoequipo_1 = __importDefault(require("../../models/tipoequipo"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const equipodescuento_1 = __importDefault(require("../../models/equipodescuento"));
const area_1 = __importDefault(require("../../models/area"));
const tipodocumento_1 = __importDefault(require("../../models/tipodocumento"));
const puesto_1 = __importDefault(require("../../models/puesto"));
const VW_SR_MIS_TICKETS_1 = __importDefault(require("../../models/SR/VW_SR_MIS_TICKETS"));
const priodidad_1 = __importDefault(require("../../models/priodidad"));
const express_1 = require("express");
const datosSolicitud_1 = __importDefault(require("../../models/datosSolicitud"));
const perfilusuario_1 = __importDefault(require("../../models/perfilusuario"));
const perfil_1 = __importDefault(require("../../models/perfil"));
const listarTipoSolicitudSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield tiposolicitud_1.default.findAll({
        raw: true,
        attributes: ["IdTipoSolicitud", "TipoSolicitud", "Estado_id"],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarTipoSolicitudSocket = listarTipoSolicitudSocket;
const listarTipoMotivoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let pTipoSolicitud_id = data.TipoSolicitud_id;
    const Query3 = yield tipomotivo_1.default.findAll({
        raw: true,
        attributes: ["IdTipoMotivo", "TipoMotivo", "TipoSolicitud_id", "Estado_id"],
        where: {
            Estado_id: "1",
            TipoSolicitud_id: pTipoSolicitud_id,
        },
    });
    return Query3;
});
exports.listarTipoMotivoSocket = listarTipoMotivoSocket;
const listarPersonalSolicitud = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let pUsuario_id = data.Usuario_id;
    solicitud_1.default.belongsTo(tiposolicitud_1.default, { foreignKey: "TipoSolicitud_id" });
    solicitud_1.default.belongsTo(tipomotivo_1.default, { foreignKey: "TipoMotivo_id" });
    solicitud_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    solicitud_1.default.belongsTo(datosSolicitud_1.default, { foreignKey: "IdSolicitud" });
    const results = yield solicitud_1.default.findAll({
        attributes: ["IdSolicitud", "FcCreacion", "Estado_id"],
        include: [
            {
                model: tiposolicitud_1.default,
                attributes: ["TipoSolicitud"],
                required: true,
            },
            {
                model: tipomotivo_1.default,
                attributes: ["TipoMotivo"],
                required: true,
            },
            {
                model: usuario_1.default,
                attributes: ["Usuario", "IdUsuario"],
                required: true,
            },
            {
                model: datosSolicitud_1.default,
                attributes: ["Nombre"],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
            Usuario_id: pUsuario_id,
        },
    });
    const Query3 = results.map((result) => {
        const plainResult = result.get({ plain: true });
        return Object.assign(Object.assign({}, plainResult), { TipoSolicitud: plainResult.TipoSolicitud.TipoSolicitud, TipoMotivo: plainResult.TipoMotivo.TipoMotivo, Usuario: plainResult.Usuario.Usuario, IdUsuario: plainResult.Usuario.IdUsuario, Nombre: plainResult.DatosSolicitud.Nombre });
    });
    return Query3;
});
exports.listarPersonalSolicitud = listarPersonalSolicitud;
//TODOS
//PONER EL NOMBRE
const listarTodosSolicitud = (data) => __awaiter(void 0, void 0, void 0, function* () {
    solicitud_1.default.belongsTo(tiposolicitud_1.default, { foreignKey: "TipoSolicitud_id" });
    solicitud_1.default.belongsTo(tipomotivo_1.default, { foreignKey: "TipoMotivo_id" });
    solicitud_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    solicitud_1.default.belongsTo(datosSolicitud_1.default, { foreignKey: "IdSolicitud" });
    const results = yield solicitud_1.default.findAll({
        attributes: ["IdSolicitud", "FcCreacion", "Estado_id"],
        include: [
            {
                model: tiposolicitud_1.default,
                attributes: ["TipoSolicitud"],
                required: true,
            },
            {
                model: tipomotivo_1.default,
                attributes: ["TipoMotivo"],
                required: true,
            },
            {
                model: usuario_1.default,
                attributes: ["Usuario", "IdUsuario"],
                required: true,
            },
            {
                model: datosSolicitud_1.default,
                attributes: ["Nombre"],
                required: true,
            },
        ],
        where: {
            Estado_id: "1",
        },
    });
    const Query3 = results.map((result) => {
        const plainResult = result.get({ plain: true });
        return Object.assign(Object.assign({}, plainResult), { TipoSolicitud: plainResult.TipoSolicitud.TipoSolicitud, TipoMotivo: plainResult.TipoMotivo.TipoMotivo, Usuario: plainResult.Usuario.Usuario, IdUsuario: plainResult.Usuario.IdUsuario, Nombre: plainResult.DatosSolicitud.Nombre });
    });
    return Query3;
});
exports.listarTodosSolicitud = listarTodosSolicitud;
//Listo
const crearSolicitudSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Query3 = yield solicitud_1.default.create({
            TipoSolicitud_id: data.TipoSolicitud_id,
            TipoMotivo_id: data.TipoMotivo_id,
            Usuario_id: data.Usuario_id,
            Cliente_id: data.Cliente_id,
            Estado_id: "1",
        });
        const Query4 = yield datosSolicitud_1.default.create({
            //datos
            Nombre: data.Nombre,
            Dni: data.Dni,
            Puesto: data.Rol,
        });
        return { msg: "CREADO EN DATOS SOLICITUD", data: data };
    }
    catch (error) {
        console.log(error);
        return { msg: "HUBO UN ERROR", error };
    }
    //agregar los datos extras
});
exports.crearSolicitudSocket = crearSolicitudSocket;
const listarIdEntidad = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield entidad_1.default.findOne({
        raw: true,
        attributes: ["IdEntidad"],
        where: {
            NroDocumento: data,
        },
    });
    return Query3;
});
exports.listarIdEntidad = listarIdEntidad;
const listarTicketPersonalSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;
    const Query3 = yield VW_SR_MIS_TICKETS_1.default.findAll({
        raw: true,
        where: {
            Usuario_id: pUsuario_id,
        },
    });
    return Query3;
});
exports.listarTicketPersonalSocket = listarTicketPersonalSocket;
const listarTicketTodosSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    ticket_1.default.belongsTo(priodidad_1.default, { foreignKey: "idPrioridad" });
    ticket_1.default.belongsTo(area_1.default, { foreignKey: "Area_id" });
    const results = yield ticket_1.default.findAll({
        attributes: [
            "IdTicket",
            "Asunto",
            "Descripcion",
            "FcCreacion",
            "Usuario_id",
        ],
        include: [
            {
                model: priodidad_1.default,
                attributes: ["Prioridad"],
            },
            {
                model: area_1.default,
                attributes: ["Area"],
            },
        ],
        where: {
            Estado_id: "3",
            Area_id: data,
            Responsable_id: {
                [sequelize_1.Op.eq]: null,
            },
        },
    });
    const Query3 = results.map((result) => {
        const plainResult = result.get({ plain: true });
        return Object.assign(Object.assign({}, plainResult), { IdTicket: plainResult.IdTicket, Asunto: plainResult.Asunto, Descripcion: plainResult.Descripcion, FcCreacion: plainResult.FcCreacion, Area_id: plainResult.Area_id, Usuario_id: plainResult.Usuario_id, Prioridad: plainResult.Prioridad.Prioridad, Area: plainResult.Area.Area });
    });
    return Query3;
});
exports.listarTicketTodosSocket = listarTicketTodosSocket;
const crearTicketSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield ticket_1.default.create({
        Asunto: data.Asunto,
        Descripcion: data.Descripcion,
        Usuario_id: data.Usuario_id,
        Area_id: data.idArea,
        Tickectcc_id: null,
        idPrioridad: data.idPrioridad,
        Estado_id: "3",
    });
    return Query3;
});
exports.crearTicketSocket = crearTicketSocket;
const actualizarResponsableTicket = (idTicket, nuevosDatos) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield ticket_1.default.update(nuevosDatos, {
        where: {
            IdTicket: idTicket,
        },
    });
    return Query3;
});
exports.actualizarResponsableTicket = actualizarResponsableTicket;
const listarTicketResponsable = (idResponsable) => __awaiter(void 0, void 0, void 0, function* () {
    ticket_1.default.belongsTo(priodidad_1.default, { foreignKey: "idPrioridad" });
    ticket_1.default.belongsTo(area_1.default, { foreignKey: "Area_id" });
    const results = yield ticket_1.default.findAll({
        attributes: [
            "IdTicket",
            "Asunto",
            "Descripcion",
            "FcCreacion",
            "Usuario_id",
        ],
        include: [
            {
                model: priodidad_1.default,
                attributes: ["Prioridad"],
            },
            {
                model: area_1.default,
                attributes: ["Area"],
            },
        ],
        where: {
            Responsable_id: idResponsable,
        },
    });
    const Query3 = results.map((result) => {
        const plainResult = result.get({ plain: true });
        return Object.assign(Object.assign({}, plainResult), { IdTicket: plainResult.IdTicket, Asunto: plainResult.Asunto, Descripcion: plainResult.Descripcion, FcCreacion: plainResult.FcCreacion, Area_id: plainResult.Area_id, Usuario_id: plainResult.Usuario_id, Prioridad: plainResult.Prioridad.Prioridad, Area: plainResult.Area.Area });
    });
    return Query3;
});
exports.listarTicketResponsable = listarTicketResponsable;
const areaUsuario = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield perfilusuario_1.default.findOne({
        attributes: ["Perfil_id"],
        where: {
            Usuario_id: idUsuario,
        },
    });
    const area = yield perfil_1.default.findOne({
        attributes: ["Area_id"],
        where: {
            IdPerfil: Query3 === null || Query3 === void 0 ? void 0 : Query3.dataValues.Perfil_id,
        },
    });
    return area === null || area === void 0 ? void 0 : area.dataValues.Area_id;
});
exports.areaUsuario = areaUsuario;
const asignarEquipos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entidad = yield entidad_1.default.findOne({
            attributes: ["IdEntidad"],
            where: [
                {
                    NroDocumento: data.nroDni,
                },
            ],
        });
        if (!entidad) {
            throw new Error("Entidad no encontrada para el número de DNI proporcionado.");
        }
        const idEntidad = entidad.dataValues.IdEntidad;
        const whereConditions = {
            [sequelize_1.Op.or]: [],
        };
        // Agregar condiciones solo si los valores están definidos y no son vacíos
        if (data.celular) {
            whereConditions[sequelize_1.Op.or].push({ id_equipo: data.celular });
        }
        if (data.laptop) {
            whereConditions[sequelize_1.Op.or].push({ id_equipo: data.laptop });
        }
        if (data.chip) {
            whereConditions[sequelize_1.Op.or].push({ id_equipo: data.chip });
        }
        if (whereConditions[sequelize_1.Op.or].length === 0) {
            throw new Error("No hay equipos válidos para actualizar");
        }
        const [affectedRows] = yield equipo_1.default.update({
            id_entidad: idEntidad,
            id_estado: "9",
        }, {
            where: whereConditions,
        });
        if (affectedRows === 0) {
            throw new Error("No se encontraron equipos que coincidan con los criterios de actualización.");
        }
        const [solicitudUpdated] = yield solicitud_1.default.update({ Estado_id: "2" }, {
            where: {
                IdSolicitud: data.nroSolicitud,
            },
        });
        if (solicitudUpdated === 0) {
            throw new Error("No se encontró ninguna solicitud para actualizar con el ID proporcionado.");
        }
        //retornar success y ya estaria.
        return { success: true, affectedRows, solicitudUpdated };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error en la asignación de equipos:", error.message);
            return { error: error.message };
        }
        else {
            console.error("Error desconocido:", error);
            return { error: "Error desconocido" };
        }
    }
});
exports.asignarEquipos = asignarEquipos;
const listarEquipoxClxTexUsuSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "id_modelo" });
    equipo_1.default.belongsTo(marca_1.default, { foreignKey: "id_marca" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "IdTipoEquipo" });
    try {
        const Query3 = yield equipo_1.default.findAll({
            attributes: ["id_equipo", "equipo_imei"],
            include: [
                {
                    model: modelo_1.default,
                    attributes: ["Modelo"],
                    required: true,
                },
                {
                    model: marca_1.default,
                    attributes: ["Marca"],
                    required: true,
                    include: [
                        {
                            model: tipoequipo_1.default,
                            attributes: ["TipoEquipo"],
                            where: {
                                TipoEquipo: data.TipoEquipo,
                            },
                        },
                    ],
                },
            ],
            where: {
                [sequelize_1.Op.or]: [{ id_estado: "7" }, { id_estado: "8" }],
            },
        });
        const results = Query3.map((result) => {
            const plainResult = result.get({ plain: true });
            return Object.assign(Object.assign({}, plainResult), { id_equipo: plainResult.id_equipo, equipo_imei: plainResult.equipo_imei, Modelo: plainResult.Modelo.Modelo, Marca: plainResult.Marca.Marca });
        });
        return results;
    }
    catch (error) {
        return error;
    }
});
exports.listarEquipoxClxTexUsuSocket = listarEquipoxClxTexUsuSocket;
const listarAccesorioxClxTexUsuSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.hasMany(equipostock_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
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
                model: equipostock_1.default,
                required: true,
                attributes: [],
                where: {
                    Usuario_id: 5,
                },
            },
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
                                    Clasificacion: "Accesorio",
                                },
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
        where: {},
    });
    return Query3;
});
exports.listarAccesorioxClxTexUsuSocket = listarAccesorioxClxTexUsuSocket;
const armarPdfSolicitudSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    const ids = data.dato.Accesorio.split(",").map(Number) || "";
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
                include: [{ model: marca_1.default, attributes: [], required: true }],
            },
            {
                model: cliente_1.default,
                attributes: [],
                required: true,
            },
        ],
        where: {
            IdEquipo: {
                [sequelize_1.Op.in]: ids,
            },
        },
    });
    const equipoIds = Object.values(data.dato)
        .filter((value, index) => value !== "" && index !== Object.keys(data.dato).indexOf("Accesorio"))
        .map(Number);
    equipo_1.default.hasMany(equiposerie_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    const Query0 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Cliente.CodCliente",
            "Modelo.Marca.Marca",
            "Modelo.Modelo",
            "EquipoSeries.Serie",
            "EquipoSeries.Identificador",
            "Modelo.Marca.TipoEquipo.TipoEquipo",
            "EquipoSeries.TiempoVida",
            "EquipoSeries.Observacion",
        ],
        include: [
            {
                model: equiposerie_1.default,
                attributes: [],
                required: true,
                where: {
                    IdEquipoSerie: {
                        [sequelize_1.Op.in]: equipoIds.join(",").split(",").map(Number),
                    },
                },
            },
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
    const equipoIdsQuery0 = Query0.map((equipo) => equipo.IdEquipo);
    equipo_1.default.hasMany(equipodescuento_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.hasMany(equiposerie_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    const Query1 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Cliente.CodCliente",
            "Modelo.Marca.Marca",
            "Modelo.Modelo",
            "Modelo.Marca.TipoEquipo.TipoEquipo",
            "EquipoDescuentos.Tiempo",
            "EquipoDescuentos.Precio",
        ],
        include: [
            {
                model: equipodescuento_1.default,
                attributes: [],
                required: true,
            },
            {
                model: cliente_1.default,
                attributes: [],
                required: true,
            },
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
        ],
        where: {
            IdEquipo: {
                [sequelize_1.Op.in]: equipoIdsQuery0,
            },
        },
    });
    entidad_1.default.hasMany(usuario_1.default, { foreignKey: "Entidad_id" });
    entidad_1.default.belongsTo(area_1.default, { foreignKey: "Area_id" });
    const UsuarioQuery = yield entidad_1.default.findAll({
        raw: true,
        attributes: ["Area.Area", "NombreCompleto"],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: true,
                where: {
                    IdUsuario: data.usuario_id,
                },
            },
            {
                model: area_1.default,
                attributes: [],
                required: true,
            },
        ],
    });
    const UsuarioQuery1 = yield entidad_1.default.findAll({
        raw: true,
        attributes: ["Area.Area", "NombreCompleto"],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: true,
                where: {
                    IdUsuario: data.usuario_id,
                },
            },
            {
                model: area_1.default,
                attributes: [],
                required: true,
            },
        ],
    });
    return new Promise((resolve, reject) => {
        try {
            const doc = new pdfkit_1.default({
                size: "A4",
            });
            const chunks = []; // Array para almacenar los chunks de datos del PDF
            doc.on("data", (chunk) => {
                chunks.push(chunk); // Almacenar cada chunk de datos del PDF
            });
            doc.on("end", () => {
                const pdfBytes = Buffer.concat(chunks); // Concatenar los chunks en un buffer
                resolve(new Uint8Array(pdfBytes)); // Convertir el buffer en Uint8Array y resolver la promesa
            });
            // Insertar la imagen
            const imgPath = "src/assets/Pantalla1.png";
            doc.image(imgPath, 0, 0, {
                fit: [doc.page.width, doc.page.height],
                align: "center",
                valign: "center",
            });
            const fecha = new Date();
            // Obtener día, mes y año
            const dia = fecha.getDate().toString().padStart(2, "0"); // Obtener el día del mes (con ceros a la izquierda si es necesario)
            const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Obtener el mes (se suma 1 ya que los meses son indexados desde 0)
            const año = fecha.getFullYear();
            // Formatear la fecha como "dd/mm/yyyy"
            const fechaFormateada = `${dia}/${mes}/${año}`;
            doc.fontSize(12).text(fechaFormateada, 508, 167, { width: 400 });
            doc.fontSize(12).text(data.datosolicitud, 72, 167);
            doc.fontSize(12).text(data.datomotivo, 63, 185);
            // Empezamos con la Lógica
            let yPos = 320; // Posición inicial
            const lineSpacing = 15; // Espaciado entre líneas
            let zPos = 547; // Posición inicial
            Query0.forEach((item) => {
                if (item.TipoEquipo === "Chip") {
                    doc.fontSize(12).text(`${item.TipoEquipo} ${item.Marca}`, 20, yPos);
                }
                else {
                    doc
                        .fontSize(12)
                        .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, yPos);
                }
                doc.fontSize(12).text(`${item.Serie}`, 210, yPos);
                doc.fontSize(12).text(`${item.Identificador}`, 340, yPos);
                doc
                    .fontSize(12)
                    .text(`${item.TiempoVida} meses`, 475, yPos, { width: 400 });
                yPos += lineSpacing;
                if (item.TipoEquipo === "Chip") {
                    doc.fontSize(12).text(`${item.TipoEquipo} ${item.Marca}`, 20, zPos);
                }
                else {
                    doc
                        .fontSize(12)
                        .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, zPos);
                }
                doc.fontSize(12).text(`${item.Observacion}`, 210, zPos);
                zPos += lineSpacing;
            });
            Query3.forEach((item) => {
                doc.fontSize(12).text(`${item.Modelo}`, 20, yPos);
                yPos += lineSpacing;
            });
            UsuarioQuery.forEach((usuario) => {
                doc.fontSize(12).text(`${usuario.NombreCompleto}`, 80, 202);
                doc.fontSize(12).text(`${usuario.Area}`, 505, 190, { width: 400 });
            });
            //-------------------------------
            doc.addPage(); //PAGINA 2
            //-------------------------------
            //Fondo de Pantalla
            const imgPath1 = "src/assets/Pantalla2.png";
            doc.image(imgPath1, 0, 0, {
                fit: [doc.page.width, doc.page.height],
                align: "center",
                valign: "center",
            });
            UsuarioQuery.forEach((usuario) => {
                doc
                    .fontSize(11)
                    .text(`Recibido por: ${usuario.NombreCompleto}`, 20, 650, {
                    width: 400,
                });
                doc.fontSize(11).text(`Area: ${usuario.Area}`, 20, 665, { width: 400 });
            });
            UsuarioQuery1.forEach((usuario) => {
                doc
                    .fontSize(11)
                    .text(`Recibido por: ${usuario.NombreCompleto}`, 370, 650, {
                    width: 400,
                });
                doc
                    .fontSize(11)
                    .text(`Area: ${usuario.Area}`, 370, 665, { width: 400 });
            });
            let y1Pos = 250; // Posición inicial
            const line1Spacing = 15; // Espaciado entre líneas
            let z1Pos = 547; // Posición inicial
            const formattedData = Query1.map((equipo) => {
                return `${equipo.Tiempo}mes:S/.${equipo.Precio.toFixed(2)}`;
            }).join(";");
            Query0.forEach((item) => {
                if (item.TipoEquipo === "Chip") {
                }
                else {
                    doc
                        .fontSize(12)
                        .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, y1Pos);
                    doc.fontSize(12).text(`${formattedData}`, 210, y1Pos);
                }
                y1Pos += line1Spacing;
            });
            doc.end();
            console.log("PDF generado con éxito");
        }
        catch (error) {
            console.error("Error durante la generación del PDF:", error);
            reject(error); // Rechazar la promesa en caso de error
        }
    });
});
exports.armarPdfSolicitudSocket = armarPdfSolicitudSocket;
const listarTipoDocumento = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield tipodocumento_1.default.findAll({
        raw: true,
        attributes: ["IdTipoDocumento", "TipoDocumento", "Agrupacion", "Estado_id"],
        where: {},
    });
    return Query3;
});
exports.listarTipoDocumento = listarTipoDocumento;
const listarAreaSocket = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const Query3 = yield area_1.default.findAll({
        raw: true,
        attributes: ["IdArea", "Area", "Estado_id"],
        where: {},
    });
    return Query3;
});
exports.listarAreaSocket = listarAreaSocket;
const listarArea = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const Query3 = yield area_1.default.findAll({
        raw: true,
        attributes: ["IdArea", "Area", "Estado_id"],
        where: {},
    });
    if (Query3) {
        try {
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
exports.listarArea = listarArea;
const listarPrioridad = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const Query3 = yield priodidad_1.default.findAll({
        raw: true,
        attributes: ["IdPrioridad", "Prioridad"],
        where: {},
    });
    if (Query3) {
        try {
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
exports.listarPrioridad = listarPrioridad;
const listarPuesto = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield puesto_1.default.findAll({
        raw: true,
        attributes: ["IdPuesto", "Puesto", "Estado_id"],
        where: { Area_id: data.Area },
    });
    return Query3;
});
exports.listarPuesto = listarPuesto;
const listarSolicitudXId = (data) => __awaiter(void 0, void 0, void 0, function* () {
    solicitud_1.default.belongsTo(tipomotivo_1.default, { foreignKey: "TipoMotivo_id" });
    solicitud_1.default.belongsTo(tiposolicitud_1.default, { foreignKey: "TipoSolicitud_id" });
    solicitud_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    const Query3 = yield solicitud_1.default.findAll({
        raw: true,
        attributes: [
            "TipoSolicitud.IdTipoSolicitud",
            "TipoMotivo.IdTipoMotivo",
            "TipoSolicitud.TipoSolicitud",
            "TipoMotivo.TipoMotivo",
            "Usuario.Usuario",
            "FcCreacion",
            "Estado_id",
        ],
        include: [
            { model: tiposolicitud_1.default, attributes: [], required: true },
            { model: tipomotivo_1.default, attributes: [], required: true },
            { model: usuario_1.default, attributes: [], required: true },
        ],
        where: { IdSolicitud: data.IdSolicitud },
    });
    return Query3;
});
exports.listarSolicitudXId = listarSolicitudXId;
const listarDatosSolicitud = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield datosSolicitud_1.default.findOne({
        raw: true,
        attributes: ["Nombre", "Dni", "Puesto"],
        where: { IdSolicitud: data.IdSolicitud },
    });
    return Query3;
});
exports.listarDatosSolicitud = listarDatosSolicitud;
