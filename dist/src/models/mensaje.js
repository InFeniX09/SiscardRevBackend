"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Mensaje = connection_1.db[0].define("Mensaje", {
    IdMensaje: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    DeUsuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ParaUsuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Mensaje: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FechaCreacion: {
        type: sequelize_1.DataTypes.DATE,
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
exports.default = Mensaje;
