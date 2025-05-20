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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../routes/auth"));
const logistica_1 = __importDefault(require("../routes/logistica"));
const pilotaje_1 = __importDefault(require("../routes/pilotaje"));
const select_1 = __importDefault(require("../routes/select"));
const Pdf_1 = __importDefault(require("../routes/Pdf"));
const connection_1 = require("../db/connection");
const connectionPoas_1 = require("../db/connectionPoas");
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("../sockets/socket"));
const connectionDWH_1 = require("../db/connectionDWH");
class Server {
    //Inicializador
    constructor() {
        //Variables de rutas
        this.paths = {
            auth: "/auth",
            infraestructura: "/infraestructura",
            CentroAtencion: "/centro-atencion",
            InventarioDepartamental: "/inventario-departamental",
            Select: "/select",
            Menu: "/menu",
            Logistica: "/Logistica",
            Pilotaje: "/pilotaje",
            Pdf: "/pdf"
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3100";
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: "*", // O puedes especificar los orígenes permitidos aquí
                methods: ["GET", "POST"], // Métodos permitidos
            },
        });
        this.sockets = new socket_1.default(this.io);
    }
    //Intermediario
    midlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    //Rutas
    routes() {
        this.app.use(this.paths.auth, auth_1.default);
        this.app.use(this.paths.Logistica, logistica_1.default);
        this.app.use(this.paths.Pilotaje, pilotaje_1.default);
        this.app.use(this.paths.Select, select_1.default);
        this.app.use(this.paths.Pdf, Pdf_1.default);
    }
    //Conexion a la base de datos
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connection_1.connect)();
                yield (0, connectionPoas_1.connectPoas)();
                yield (0, connectionDWH_1.ConnectDWH)();
                console.log("Bases de datos online");
            }
            catch (error) {
                console.log("Bases de datos offline");
                console.log(error);
                throw error;
            }
        });
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
exports.default = Server;
