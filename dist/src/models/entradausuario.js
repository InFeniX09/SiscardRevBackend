"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const EntradaUsuario = connection_1.db[0].define("EntradaUsuario", {
    IdEntradaUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    UsuarioIp: {
        type: sequelize_1.DataTypes.STRING,
    },
    UsuarioEntrada: {
        type: sequelize_1.DataTypes.DATE,
    },
    UsuarioSalida: {
        type: sequelize_1.DataTypes.DATE,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = EntradaUsuario;
