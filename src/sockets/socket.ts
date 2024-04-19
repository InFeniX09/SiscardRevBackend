import { Server as SocketIOServer } from "socket.io";
import {
  crearMensajeSocket,
  listarUsuarioSocket,
  listarchatSocket,
} from "../controllers/Extra/chat";
import {
  crearSolicitudSocket,
  crearTicketSocket,
  listarSolicitud,
  listarTicketSocket,
  listarTipoMotivoSocket,
  listarTipoSolicitudSocket,
} from "../controllers/Ayuda/centro-atencion";
import {
  listarEquipoDescuentoSocket,
  listarEquipoSocket,
  listarMarcaSocket,
  listarModeloSocket,
  listarTipoEquipoSocket,
} from "../controllers/Logistica/gestion-equipo";
import {
  listarEquipoControlSocket,
  listarEquipoSerieSocket,
  listarEquipoStockSocket,
} from "../controllers/Logistica/gestion-stock";
import { listarClienteSocket } from "../controllers/Sistemas/gestion-entidad";

class Sockets {
  private io: SocketIOServer;
  constructor(io: SocketIOServer) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log(`${socket.id} connected.`);

      /*centro-atencion PAGE*/
      socket.on("listar-tiposolicitud", async (data, callback) => {
        const json = await listarTipoSolicitudSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-tipomotivo", async (data, callback) => {
        const json = await listarTipoMotivoSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-misolicitud", async (data, callback) => {
        console.log("quesada", data);
        const json = await listarSolicitud(data);
        console.log("natael", json);
        callback(json);
      });
      socket.on("listar-miticket", async (data, callback) => {
        console.log(data);
        const json = await listarTicketSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-solicitud", async (data, callback) => {
        const json = await listarSolicitud(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-ticket", async (data, callback) => {
        console.log(data);
        const json = await listarTicketSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("crear-solicitud", async (data, callback) => {
        try {
          const crear = await crearSolicitudSocket(data);
          callback("si");
        } catch {
          callback("no");
        }
      });
      /**/
      /*Gestion-Equipo*/

      socket.on("listar-tipoequipo", async (data, callback) => {
        const json = await listarTipoEquipoSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-marca", async (data, callback) => {
        const json = await listarMarcaSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-modelo", async (data, callback) => {
        const json = await listarModeloSocket(data);
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipo", async (data, callback) => {
        const json = await listarEquipoSocket();
        console.log("json", json);
        callback(json);
      });
      /*Gestion-Stock*/
      socket.on("listar-equipostock", async (data, callback) => {
        const json = await listarEquipoStockSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipocontrol", async (data, callback) => {
        const json = await listarEquipoControlSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equipodescuento", async (data, callback) => {
        const json = await listarEquipoDescuentoSocket();
        console.log("json", json);
        callback(json);
      });
      socket.on("listar-equiposerie", async (data, callback) => {
        const json = await listarEquipoSerieSocket();
        console.log("json", json);
        callback(json);
      });
      /*Gestion-Entidad*/
      socket.on("listar-cliente", async (data, callback) => {
        const json = await listarClienteSocket();
        console.log("json", json);
        callback(json);
      });
      /**/
      socket.on("crear-ticket", async (data, callback) => {
        const data1 = await crearTicketSocket(data);
        const data2 = await listarTicketSocket(data);
        this.io.emit("listar-ticket", data2);
      });
      socket.on("listar-usuario", async (data, callback) => {
        console.log("yara" + data);
        const dom = await listarUsuarioSocket(data);
        callback(dom);
      });
      socket.on("listar-chat", async (data, callback) => {
        console.log("entraste:", data.DeUsuario_id);
        socket.join(data.DeUsuario_id);
        const chat = await listarchatSocket(data);
        callback(chat);
      });
      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await crearMensajeSocket(payload);
        const chat = await listarchatSocket(payload);
        this.io.to(payload.ParaUsuario_id).emit("mensaje-personal", chat);
        this.io.to(payload.DeUsuario_id).emit("mensaje-personal", chat);
      });
    });
  }
}

export default Sockets;
