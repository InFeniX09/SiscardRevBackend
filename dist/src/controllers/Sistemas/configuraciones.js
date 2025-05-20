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
exports.listarEmpleadoSinUsuario = exports.listarTablaMenuAsignado = void 0;
const sequelize_1 = require("sequelize");
const menu_1 = __importDefault(require("../../models/menu"));
const menuasignado_1 = __importDefault(require("../../models/menuasignado"));
const perfil_1 = __importDefault(require("../../models/perfil"));
const perfilusuario_1 = __importDefault(require("../../models/perfilusuario"));
const usuario_1 = __importDefault(require("../../models/usuario"));
const entidad_1 = __importDefault(require("../../models/entidad"));
const listarTablaMenuAsignado = () => __awaiter(void 0, void 0, void 0, function* () {
    menuasignado_1.default.belongsTo(menu_1.default, { foreignKey: "Menu_id" });
    menuasignado_1.default.belongsTo(usuario_1.default, { foreignKey: "Usuario_id" });
    menuasignado_1.default.belongsTo(perfilusuario_1.default, { foreignKey: "PerfilUsuario_id" });
    perfilusuario_1.default.belongsTo(perfil_1.default, { foreignKey: "Perfil_id" });
    const results = yield menuasignado_1.default.findAll({
        raw: true,
        attributes: [
            "MenuAsignado.IdMenuAsignado",
            [sequelize_1.Sequelize.literal("COALESCE(Menu.Menu, '')"), "Menu"],
            [sequelize_1.Sequelize.literal("COALESCE(Usuario.Usuario, '')"), "Usuario"],
            [
                sequelize_1.Sequelize.literal("COALESCE([PerfilUsuario->Perfil].Perfil, '')"),
                "Perfil",
            ],
            "MenuAsignado.Estado_id",
        ],
        include: [
            {
                model: menu_1.default,
                attributes: [],
                required: true,
            },
            {
                model: usuario_1.default,
                attributes: [],
                required: false,
            },
            {
                model: perfilusuario_1.default,
                attributes: [],
                required: false,
                include: [{ model: perfil_1.default, attributes: [], required: false }],
            },
        ],
        where: {},
    });
    return results;
});
exports.listarTablaMenuAsignado = listarTablaMenuAsignado;
const listarEmpleadoSinUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
    entidad_1.default.hasMany(usuario_1.default, { foreignKey: "Entidad_id" });
    const results = yield entidad_1.default.findAll({
        raw: true,
        attributes: ["Entidad.IdEntidad", "Entidad.Nombres", "Entidad.Apellidos", "Usuarios.Entidad_id"],
        include: [
            {
                model: usuario_1.default,
                attributes: [],
                required: false,
            },
        ],
        where: { '$Usuarios.Entidad_id$': null },
    });
    return results;
});
exports.listarEmpleadoSinUsuario = listarEmpleadoSinUsuario;
