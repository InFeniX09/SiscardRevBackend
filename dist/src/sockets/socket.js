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
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../controllers/Extra/chat");
const centro_atencion_1 = require("../controllers/Soporte/centro-atencion");
const gestion_equipo_1 = require("../controllers/Logistica/gestion-equipo");
const gestion_stock_1 = require("../controllers/Logistica/gestion-stock");
const gestion_entidad_1 = require("../controllers/Sistemas/gestion-entidad");
const auth_1 = require("../controllers/Auth/auth");
const configuraciones_1 = require("../controllers/RecursosHumanos/configuraciones");
const configuraciones_2 = require("../controllers/Sistemas/configuraciones");
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on("connection", (socket) => {
            (`${socket.id} aaaaaa`);
            /*----------------------------
            --#Módulo Autorización
            ----------------------------*/
            socket.on("enviarcorreo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, auth_1.enviarCorreoSocket)(data);
                callback(json);
            }));
            socket.on("recuperar-clave", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, auth_1.recuperarClave)(data);
                callback(json);
            }));
            socket.on("recuperacion-clavetoken", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, auth_1.recuperarClaveToken)(data);
                callback(json);
            }));
            socket.on("cambio-clave", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, auth_1.cambioClave)(data);
                callback(json);
            }));
            socket.on("listar-menuxusuarioxperfil", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, chat_1.listarMenuxUsuarioxPerfil)(data);
                callback(json);
            }));
            /*----------------------------
            --#Módulo Recursos Humanos
            ----------------------------*/
            socket.on("listar-tipodocumento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTipoDocumento)();
                callback(json);
            }));
            socket.on("listar-area", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarAreaSocket)();
                callback(json);
            }));
            socket.on("listar-puesto", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarPuesto)(data);
                callback(json);
            }));
            socket.on("listar-tablaempleado", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, configuraciones_1.listarTablaEmpleado)();
                callback(json);
            }));
            socket.on("crear-empleado", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, configuraciones_1.crearEmpleado)(data);
                callback(json);
            }));
            socket.on("listar-departamento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, configuraciones_1.listarDepartamento)();
                callback(json);
            }));
            socket.on("listar-provinciaxdepartamento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, configuraciones_1.listarProvinciaXDepartamento)(data);
                callback(json);
            }));
            socket.on("listar-distritoxprovinciaxdepartamento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, configuraciones_1.listarDistritoXProvinciaXDepartamento)(data);
                callback(json);
            }));
            /*----------------------------
            --#Módulo Sistemas
            ----------------------------*/
            socket.on("listar-usuario", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, chat_1.listarUsuarioSocket)(data);
                callback(dom);
            }));
            socket.on("listar-zona", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, chat_1.listarZonasSocket)(data);
                callback(dom);
            }));
            socket.on("listar-equipos-siscard", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, chat_1.listarEquiposSiscardSocket)(data);
                callback(dom);
            }));
            socket.on("listar-perfil", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, gestion_entidad_1.listarPerfilSocket)();
                callback(dom);
            }));
            socket.on("listar-cliente", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_entidad_1.listarClienteSocket)();
                callback(json);
            }));
            socket.on("crear-usuario", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_entidad_1.crearUsuario)(data);
                callback(json);
            }));
            socket.on("listar-tablamenuasignado", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, configuraciones_2.listarTablaMenuAsignado)();
                callback(dom);
            }));
            socket.on("listar-usuarioxperfil", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, gestion_entidad_1.listarUsuarioPerfilSocket)();
                callback(dom);
            }));
            socket.on("listar-empleadosinusuario", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const dom = yield (0, configuraciones_2.listarEmpleadoSinUsuario)();
                callback(dom);
            }));
            /*----------------------------
            --#Módulo Logística
            ----------------------------*/
            socket.on("listar-clasificacionequipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarClasificacionEquipoSocket)();
                callback(json);
            }));
            socket.on("listar-tipoequipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarTipoEquipoSocket)();
                callback(json);
            }));
            socket.on("listar-tipoequipoxcl", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarTipoEquipoxClSocket)(data);
                callback(json);
            }));
            socket.on("listar-marca", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarMarcaSocket)();
                callback(json);
            }));
            socket.on("listar-modelo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarModeloSocket)();
                callback(json);
            }));
            socket.on("listar-equipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarEquipoSocket)();
                callback(json);
            }));
            socket.on("listar-descuento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarDescuentoSocket)(data);
                callback(json);
            }));
            socket.on("crear-tipoequipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.crearTipoEquipoSocket)(data);
                callback(json);
            }));
            socket.on("crear-marca", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.crearMarcaSocket)(data);
                callback(json);
            }));
            socket.on("crear-modelo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.crearModeloSocket)(data);
                callback(json);
            }));
            socket.on("crear-equipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.crearEquipoSocket)(data);
                callback(json);
            }));
            socket.on("crear-equipodescuento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.crearEquipoDescuentoSocket)(data);
                callback(json);
            }));
            socket.on("ingresar-stock", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.crearEquipoStockSocket)(data);
                callback(json);
            }));
            socket.on("listar-equipostock", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_stock_1.listarEquipoStockSocket)();
                callback(json);
            }));
            socket.on("listar-equiposeriexidequipostock", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_stock_1.listarEquipoSerieXIdEquipoStock)(data);
                callback(json);
            }));
            socket.on("listar-equipocontrol", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_stock_1.listarEquipoControlSocket)();
                callback(json);
            }));
            socket.on("listar-equipodescuento", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarEquipoDescuentoSocket)();
                callback(json);
            }));
            socket.on("listar-equiposerie", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_stock_1.listarEquipoSerieSocket)();
                callback(json);
            }));
            socket.on("cargamasiva-equipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_stock_1.cargaMasivaEquipoSocket)(data);
                callback(json);
            }));
            socket.on("listar-equipoxclasificacion", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_stock_1.listarEquipoxClasificacionSocket)();
                callback(json);
            }));
            socket.on("listar-MarcaxTipoEquipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarMarcaxTipoEquipo)();
                callback(json);
            }));
            socket.on("listar-marcaxtipoequipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarMarcaXTipoEquipo)(data);
                callback(json);
            }));
            socket.on("listar-modeloxmarca", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarModeloXMarca)(data);
                callback(json);
            }));
            socket.on("listar-equipoxareaxclientextipoequipo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarEquipoXAreaXClienteXTipoEquipo)(data);
                callback(json);
            }));
            socket.on("listar-equipoxclxtc", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, gestion_equipo_1.listarEquipoxClxTCSocket)(data);
                callback(json);
            }));
            /*----------------------------
            --#Módulo Operaciones
            ----------------------------*/
            /*----------------------------
            --#Módulo Soporte
            ----------------------------*/
            socket.on("listar-solicitudxid", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarSolicitudXId)(data);
                callback(json);
            }));
            socket.on("listar-datos-solicitud", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarDatosSolicitud)(data);
                callback(json);
            }));
            socket.on("armarpdf-solicitud", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.armarPdfSolicitudSocket)(data);
                callback(json);
            }));
            socket.on("listar-tiposolicitud", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTipoSolicitudSocket)();
                callback(json);
            }));
            socket.on("listar-tipomotivo", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTipoMotivoSocket)(data);
                callback(json);
            }));
            socket.on("listar-misolicitud", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarPersonalSolicitud)(data);
                callback(json);
            }));
            socket.on("listar-miticket", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTicketPersonalSocket)(data);
                callback(json);
            }));
            socket.on("listar-solicitud", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTodosSolicitud)(data);
                callback(json);
            }));
            socket.on("listar-ticket", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTicketTodosSocket)(data);
                callback(json);
            }));
            socket.on("crear-solicitud", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.crearSolicitudSocket)(data);
                socket.emit("nueva-solicitud");
                callback(json);
            }));
            socket.on("crear-ticket", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.crearTicketSocket)(data);
                socket.emit("nuevo-ticket");
                callback(json);
            }));
            socket.on("update-responsable-ticket", (idTicket, data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.actualizarResponsableTicket)(idTicket, data);
                socket.emit("ticket-aceptado");
                callback(json);
            }));
            socket.on("listar-ticket-responsable", (idResponsable, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarTicketResponsable)(idResponsable);
                callback(json);
            }));
            socket.on("area-id-usuario", (idResponsable, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.areaUsuario)(idResponsable);
                callback(json);
            }));
            socket.on("asignar-equipos", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.asignarEquipos)(data);
                callback(json);
            }));
            /*----------------------------
            --#Módulo Extras
            ----------------------------*/
            socket.on("listar-chat", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                socket.join(data.DeUsuario_id);
                const chat = yield (0, chat_1.listarchatSocket)(data);
                callback(chat);
            }));
            socket.on("mensaje-personal", (payload) => __awaiter(this, void 0, void 0, function* () {
                const mensaje = yield (0, chat_1.crearMensajeSocket)(payload);
                const chat = yield (0, chat_1.listarchatSocket)(payload);
                this.io.to(payload.ParaUsuario_id).emit("mensaje-personal", chat);
                this.io.to(payload.DeUsuario_id).emit("mensaje-personal", chat);
            }));
            socket.on("listar-reporte", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, chat_1.listarReporte)();
                callback(json);
            }));
            socket.on("generar-excelreporte", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, chat_1.generarExcelReporte)(data);
                callback(json);
            }));
            socket.on("listar-accesorioxclxtexusu", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarAccesorioxClxTexUsuSocket)();
                callback(json);
            }));
            socket.on("listar-equipoxclxtexusu", (data, callback) => __awaiter(this, void 0, void 0, function* () {
                const json = yield (0, centro_atencion_1.listarEquipoxClxTexUsuSocket)(data);
                callback(json);
            }));
            /*----------------------------
            --#Módulo PILOTAJE
            ----------------------------*/
            socket.on("listar-clientes", (callback) => __awaiter(this, void 0, void 0, function* () {
                const json = "hola";
                callback(json);
            }));
        });
    }
}
exports.default = Sockets;
