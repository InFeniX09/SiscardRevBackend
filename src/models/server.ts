import express from "express";
import http from "http";
import cors from "cors";
import menuRouth from "../routes/menu";
import authRouth from "../routes/auth";
import infraestructuraRouth from "../routes/infraestructura";
import CentroAtencionRouth from "../routes/centro-atencion";
import SelectRouth from "../routes/select";
import InventarioDepartamentalRouth from "../routes/inventario-departamental";
import LogisticaRouth from "../routes/logistica";
import { connect } from "../db/connection";
import { connectPoas } from "../db/connectionPoas";
import { Server as SocketIOServer } from "socket.io";


class Server {
  //Variables para definir el servidor
  private app: express.Application;
  private port: String;
  private server:  http.Server;
  private io: SocketIOServer;

  //Variables de rutas
  private paths = {
    auth: "/auth",
    infraestructura: "/infraestructura",
    CentroAtencion: "/centro-atencion",
    InventarioDepartamental: "/inventario-departamental",
    Select: "/select",
    Menu:"/menu",
    Logistica:"/Logistica"

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
    this.app.use(this.paths.infraestructura, infraestructuraRouth);
    this.app.use(this.paths.CentroAtencion, CentroAtencionRouth);
    this.app.use(
      this.paths.InventarioDepartamental,
      InventarioDepartamentalRouth
    );
    this.app.use(this.paths.Select, SelectRouth);
    this.app.use(this.paths.Menu, menuRouth);
    this.app.use(this.paths.Logistica, LogisticaRouth);

  }
  //Conexion a la base de datos
  async dbConnect() {
    try {
      await connect();
      await connectPoas();
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
    this.setupSocket();
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }

  private setupSocket() {
    this.io.on("connection", (socket) => {
      console.log(`${socket.id} connected.`);
      // Aquí puedes manejar eventos de socket adicionales
    });
  }

}

export default Server;
