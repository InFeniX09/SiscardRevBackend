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
exports.listarSolicitudXId = exports.listarPuesto = exports.listarArea = exports.listarTipoDocumento = exports.armarPdfSolicitudSocket = exports.listarAccesorioxClxTexUsuSocket = exports.listarEquipoxClxTexUsuSocket = exports.crearTicketSocket = exports.listarTicketSocket = exports.crearSolicitudSocket = exports.listarSolicitud = exports.listarTipoMotivoSocket = exports.listarTipoSolicitudSocket = void 0;
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
const listarSolicitud = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let pUsuario_id = data.Usuario_id;
    solicitud_1.default.belongsTo(tiposolicitud_1.default, { foreignKey: "TipoSolicitud_id" });
    solicitud_1.default.belongsTo(tipomotivo_1.default, { foreignKey: "TipoMotivo_id" });
    solicitud_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
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
        ],
        where: {
            Estado_id: "1",
            Usuario_id: {
                [sequelize_1.Op.like]: pUsuario_id
                    ? sequelize_1.Sequelize.literal(`ISNULL('${pUsuario_id}', '%')`)
                    : "%",
            },
        },
    });
    const Query3 = results.map((result) => {
        const plainResult = result.get({ plain: true });
        return Object.assign(Object.assign({}, plainResult), { TipoSolicitud: plainResult.TipoSolicitud.TipoSolicitud, TipoMotivo: plainResult.TipoMotivo.TipoMotivo, Usuario: plainResult.Usuario.Usuario, IdUsuario: plainResult.Usuario.IdUsuario });
    });
    return Query3;
});
exports.listarSolicitud = listarSolicitud;
//Listo
const crearSolicitudSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield solicitud_1.default.findOne({
        where: {
            TipoSolicitud_id: data.TipoSolicitud_id,
            TipoMotivo_id: data.TipoMotivo_id,
            Usuario_id: data.Usuario_id,
        },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        const Query3 = yield solicitud_1.default.create({
            TipoSolicitud_id: data.TipoSolicitud_id,
            TipoMotivo_id: data.TipoMotivo_id,
            Usuario_id: data.Usuario_id,
        });
        return { msg: "NoExiste", data: Query3 };
    }
});
exports.crearSolicitudSocket = crearSolicitudSocket;
const listarTicketSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;
    const Query3 = yield ticket_1.default.findAll({
        raw: true,
        attributes: ["IdTicket", "Asunto", "Descripcion", "Usuario_id"],
        where: {
            Estado_id: "1",
            Usuario_id: {
                [sequelize_1.Op.like]: pUsuario_id
                    ? sequelize_1.Sequelize.literal(`ISNULL('${pUsuario_id}', '%')`)
                    : "%",
            },
        },
    });
    return Query3;
});
exports.listarTicketSocket = listarTicketSocket;
const crearTicketSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let pasunto = (_a = data.Asunto) === null || _a === void 0 ? void 0 : _a.toString();
    let pdescripcion = (_b = data.Descripcion) === null || _b === void 0 ? void 0 : _b.toString();
    let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;
    let pidArea = data.idArea ? parseInt(data.idArea) : null;
    let pidTicketcc = data.idTicketcc ? parseInt(data.idTicketcc) : null;
    let pidPrioridad = data.idPrioridad ? parseInt(data.idPrioridad) : null;
    const Query3 = yield ticket_1.default.create({
        Asunto: pasunto,
        Descripcion: pdescripcion,
        idUsuario: pUsuario_id,
        idArea: pidArea,
        idTicketcc: pidTicketcc,
        idPrioridad: pidPrioridad,
    });
    return Query3;
});
exports.crearTicketSocket = crearTicketSocket;
const listarEquipoxClxTexUsuSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    equipo_1.default.hasMany(equipostock_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.hasMany(equiposerie_1.default, { foreignKey: "Equipo_id" });
    equipo_1.default.belongsTo(cliente_1.default, { foreignKey: "Cliente_id" });
    equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "Modelo_id" });
    modelo_1.default.belongsTo(marca_1.default, { foreignKey: "Marca_id" });
    marca_1.default.belongsTo(tipoequipo_1.default, { foreignKey: "TipoEquipo_id" });
    const Query3 = yield equipo_1.default.findAll({
        raw: true,
        attributes: [
            "IdEquipo",
            "Cliente.CodCliente",
            "Modelo.Marca.Marca",
            "Modelo.Modelo",
            "EquipoSeries.Serie",
            "EquipoSeries.IdEquipoSerie",
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
                model: equiposerie_1.default,
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
                        include: [
                            {
                                model: tipoequipo_1.default,
                                attributes: [],
                                required: true,
                                where: {
                                    Clasificacion: "Seriado",
                                    TipoEquipo: data.TipoEquipo,
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
                console.log("Gonzalooooo", usuario.NombreCompleto);
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
                console.log("Gonzalooooo", usuario.NombreCompleto);
            });
            let y1Pos = 250; // Posición inicial
            const line1Spacing = 15; // Espaciado entre líneas
            let z1Pos = 547; // Posición inicial
            const formattedData = Query1.map((equipo) => {
                return `${equipo.Tiempo}mes:S/.${equipo.Precio.toFixed(2)}`;
            }).join(";");
            console.log("sue", formattedData);
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
                console.log("sara", formattedData);
                console.log("sara1", `${item.TipoEquipo} ${item.Marca} ${item.Modelo}`);
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
const listarArea = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield area_1.default.findAll({
        raw: true,
        attributes: ["IdArea", "Area", "Estado_id"],
        where: {},
    });
    return Query3;
});
exports.listarArea = listarArea;
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
