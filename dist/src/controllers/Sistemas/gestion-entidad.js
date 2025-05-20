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
exports.crearUsuario = exports.listarPerfilSocket = exports.listarUsuarioPerfilSocket = exports.listarClienteSocket = void 0;
const cliente_1 = __importDefault(require("../../models/cliente"));
const usuario_1 = __importDefault(require("../../models/usuario"));
const perfil_1 = __importDefault(require("../../models/perfil"));
const perfilusuario_1 = __importDefault(require("../../models/perfilusuario"));
const listarClienteSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield cliente_1.default.findAll({
        raw: true,
        attributes: ["IdCliente", "CodCliente", "Estado_id"],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarClienteSocket = listarClienteSocket;
const listarUsuarioPerfilSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    //las declaraciones
    perfilusuario_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    perfilusuario_1.default.belongsTo(perfil_1.default, { foreignKey: "Perfil_id" });
    const Query3 = yield perfilusuario_1.default.findAll({
        attributes: ["IdPerfilUsuario"],
        include: [
            {
                model: usuario_1.default,
                attributes: ["Usuario"],
                required: true
            },
            {
                model: perfil_1.default,
                attributes: ["Perfil"],
                required: true
            }
        ],
        where: {
            Estado_id: "1",
        },
    });
    console.log(Query3);
    const resultado = Query3.map(item => ({
        IdPerfilUsuario: item.dataValues['IdPerfilUsuario'],
        Usuario: item.dataValues['Usuario'].dataValues['Usuario'],
        Perfil: item.dataValues['Perfil'].dataValues['Perfil']
    }));
    console.log("RESULTADOS: ", resultado);
    return resultado;
});
exports.listarUsuarioPerfilSocket = listarUsuarioPerfilSocket;
const listarPerfilSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    const Query3 = yield perfil_1.default.findAll({
        raw: true,
        attributes: ["IdPerfil", "Perfil", "Estado_id"],
        where: {
            Estado_id: "1",
        },
    });
    return Query3;
});
exports.listarPerfilSocket = listarPerfilSocket;
const crearUsuario = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield usuario_1.default.findOne({
        where: {
            Usuario: data.Usuario,
        },
    });
    if (Query0) {
        return { msg: "Existe" };
    }
    else {
        const Query3 = yield usuario_1.default.create({
            Usuario: data.Usuario,
            Clave: data.Clave,
            Entidad_id: data.Entidad,
        });
        return { msg: "NoExiste", data: Query3 };
    }
});
exports.crearUsuario = crearUsuario;
