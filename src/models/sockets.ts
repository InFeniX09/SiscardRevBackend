import { Server, Socket } from 'socket.io';

class Sockets {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  private socketEvents() {
    // On connection
    console.log("yaraaa")
    this.io.on("connection", (socket) => {
      console.log("raraaaa")
    });
  }
}

export default Sockets;