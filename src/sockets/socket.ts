import { Server as SocketIOServer } from "socket.io";
import {
  crearTicketSocket,
  listarTicketSocket,
} from "../controllers/centro-atencion";
import {
  crearMensajeSocket,
  listarUsuarioSocket,
  listarchatSocket,
} from "../controllers/Extra/chat";

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

      



      socket.on("crear-ticket", async (data, callback) => {
        const data1 = await crearTicketSocket(data);
        const data2 = await listarTicketSocket();
        this.io.emit("listar-ticket", data2);
      });

      socket.on("listar-usuario", async (data, callback) => {
        console.log("yara"+data)
        const dom = await listarUsuarioSocket(data);
        callback(dom);
      });

      socket.on("listar-chat", async (data, callback) => {
        console.log("entraste:",data.DeUsuario_id)
        socket.join( data.DeUsuario_id );
        const chat = await listarchatSocket(data)
        callback(chat)
      });

      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await crearMensajeSocket(payload);
        const chat = await listarchatSocket(payload)
        this.io.to(payload.ParaUsuario_id).emit("mensaje-personal", chat);
        this.io.to(payload.DeUsuario_id).emit("mensaje-personal", chat);
      });
    });
  }
}

export default Sockets;
