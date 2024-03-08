import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRouth from "../routes/auth";
import infraestructuraRouth from "../routes/infraestructura";
import CentroAtencionRouth from "../routes/centro-atencion";
import InventarioDepartamentalRouth from "../routes/inventario-departamental";

import { connect, db } from "../db/connection";

class Server {
  private app: express.Application;
  private port: String;

  private paths = {
    auth: "/auth",
    infraestructura: "/infraestructura",
    CentroAtencion: "/centro-atencion",
    InventarioDepartamental: "/inventario-departamental",

  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3100";
    this.midlewares();
    this.routes();
  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, authRouth);
    this.app.use(this.paths.infraestructura, infraestructuraRouth);
    this.app.use(this.paths.CentroAtencion, CentroAtencionRouth);
    this.app.use(this.paths.InventarioDepartamental, InventarioDepartamentalRouth);

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

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}
export default Server;
