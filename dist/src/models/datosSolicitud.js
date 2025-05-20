"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const DatosSolicitud = connection_1.db[0].define("DatosSolicitud", {
    IdSolicitud: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    Dni: {
        type: sequelize_1.DataTypes.STRING,
    },
    Puesto: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = DatosSolicitud;
