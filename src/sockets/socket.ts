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
} from "../controllers/Ayuda/solicitud";

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

      /*Solicitud PAGE*/
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
        console.log("quesada",data)
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
