"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Equipo = connection_1.db[0].define("Equipo", {
    id_equipo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    equipo_imei: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_modelo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_area: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_cliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_entidad: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Equipo;
