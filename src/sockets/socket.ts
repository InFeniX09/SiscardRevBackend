import { Server as SocketIOServer } from "socket.io";
import { crearTicketSocket, listarTicketSocket } from "../controllers/centro-atencion";

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

      socket.on("crear-ticket",async (data, callback) => {
        const data1=await crearTicketSocket(data)
        const data2=await listarTicketSocket()
        this.io.emit('listar-ticket', data2 );
         
      });
    });
  }
}

export default Sockets;
