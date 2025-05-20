"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Empleado = connection_1.db[0].define("Empleado", {
    IdEmpleado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Correo: {
        type: sequelize_1.DataTypes.STRING,
    },
    Telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    Area_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Puesto_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.INTEGER,
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
exports.default = Empleado;
