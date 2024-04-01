import express from "express";
import http from "http";
import cors from "cors";
import authRouth from "../routes/auth";
import infraestructuraRouth from "../routes/infraestructura";
import CentroAtencionRouth from "../routes/centro-atencion";
import SelectRouth from "../routes/select";
import InventarioDepartamentalRouth from "../routes/inventario-departamental";

import { connect } from "../db/connection";
import socketio from "socket.io";
import Sockets from "./sockets";

class Server {
  private app: express.Application;
  private port: String;
  private server:  http.Server;
  private io: any;

  private paths = {
    auth: "/auth",
    infraestructura: "/infraestructura",
    CentroAtencion: "/centro-atencion",
    InventarioDepartamental: "/inventario-departamental",
    Select: "/select",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3100";
    this.server = http.createServer(this.app);
    this.io = socketio(this.server,{})
  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  routes() {
    this.app.use(this.paths.auth, authRouth);
    this.app.use(this.paths.infraestructura, infraestructuraRouth);
    this.app.use(this.paths.CentroAtencion, CentroAtencionRouth);
    this.app.use(
      this.paths.InventarioDepartamental,
      InventarioDepartamentalRouth
    );
    this.app.use(this.paths.Select, SelectRouth);
  }

  async dbConnect() {
    try {
      await connect();
      console.log("Bases de datos online");
    } catch (error) {
      console.log("Bases de datos offline");
      console.log(error);
      throw error;
    }
  }

  execute() {
    this.midlewares();
    this.routes();
    this.configurarSockets();
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
