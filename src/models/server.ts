import express from "express";
import http from "http";
import cors from "cors";
import authRouth from "../routes/auth";
import LogisticaRouth from "../routes/logistica";
import PilotajeRouth from "../routes/pilotaje";
import SelectRouth from "../routes/select";
import PdfRouth from "../routes/Pdf"
import { connect } from "../db/connection";
import { connectPoas } from "../db/connectionPoas";
import { Server as SocketIOServer } from "socket.io";
import Sockets from "../sockets/socket";
import { ConnectDWH } from "../db/connectionDWH";

class Server {
  //Variables para definir el servidor
  private app: express.Application;
  private port: String;
  private server: http.Server;
  private io: SocketIOServer;
  private sockets: any;


  //Variables de rutas
  private paths = {
    auth: "/auth",
    infraestructura: "/infraestructura",
    CentroAtencion: "/centro-atencion",
    InventarioDepartamental: "/inventario-departamental",
    Select: "/select",
    Menu: "/menu",
    Logistica: "/Logistica",
    Pilotaje: "/pilotaje",
    Pdf:"/pdf"
  };
  //Inicializador
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3100";
    this.server = http.createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "*", // O puedes especificar los orígenes permitidos aquí
        methods: ["GET", "POST"], // Métodos permitidos
      },
    });
    this.sockets=new Sockets(this.io)
  }
  //Intermediario
  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  //Rutas
  routes() {
    this.app.use(this.paths.auth, authRouth);
    this.app.use(this.paths.Logistica, LogisticaRouth);
    this.app.use(this.paths.Pilotaje, PilotajeRouth);
    this.app.use(this.paths.Select, SelectRouth);
    this.app.use(this.paths.Pdf, PdfRouth)
  }
  //Conexion a la base de datos
  async dbConnect() {
    try {
      await connect();
      await connectPoas();
      await ConnectDWH();
      console.log("Bases de datos online");
    } catch (error) {
      console.log("Bases de datos offline");
      console.log(error);
      throw error;
    }
  }
  //Funcion que ejecuta todo
  execute() {
    this.midlewares();
    this.routes();
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }

  
}

export default Server;
