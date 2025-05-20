"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const entidad_1 = __importDefault(require("./entidad"));
const Usuario = connection_1.db[0].define("Usuario", {
    IdUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Usuario: {
        type: sequelize_1.DataTypes.STRING,
    },
    Clave: {
        type: sequelize_1.DataTypes.STRING,
    },
    ClaveTemporal: {
        type: sequelize_1.DataTypes.STRING,
    },
    FcIngreso: {
        type: sequelize_1.DataTypes.DATE,
    },
    FcBaja: {
        type: sequelize_1.DataTypes.DATE,
    },
    RutaImagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    Entidad_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Online: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    UltimaFechMod: {
        type: sequelize_1.DataTypes.DATE,
    },
    UltimoUserMod: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
Usuario.belongsTo(entidad_1.default, {
    foreignKey: "Entidad_id",
    as: "EntidadUsuario", // Este alias lo usarás en el include
});
exports.default = Usuario;
