"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("./usuario"));
const entidad_1 = __importDefault(require("./entidad"));
// Verifica que no esté ya asociada
if (!usuario_1.default.associations.EntidadUsuario) {
    usuario_1.default.belongsTo(entidad_1.default, {
        foreignKey: "Entidad_id",
        as: "EntidadUsuario",
    });
}
