"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../../db/connection");
const VW_SR_MIS_TICKETS = connection_1.db[0].define("VW_SR_MIS_TICKETS", {
    IdTicket: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    Asunto: {
        type: sequelize_1.DataTypes.STRING,
    },
    Descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    FcCreacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    Prioridad: {
        type: sequelize_1.DataTypes.STRING,
    },
    Responsable: {
        type: sequelize_1.DataTypes.STRING,
    },
    Area: {
        type: sequelize_1.DataTypes.STRING,
    },
    FcCierre: {
        type: sequelize_1.DataTypes.STRING,
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    Usuario_id: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = VW_SR_MIS_TICKETS;
