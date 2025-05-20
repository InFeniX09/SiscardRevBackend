"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Ticket = connection_1.db[0].define("Ticket", {
    IdTicket: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Asunto: {
        type: sequelize_1.DataTypes.STRING,
    },
    Descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    Usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Area_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Responsable_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Tickectcc_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FcCreacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    FcCierre: {
        type: sequelize_1.DataTypes.DATE,
    },
    idPrioridad: {
        type: sequelize_1.DataTypes.INTEGER,
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
exports.default = Ticket;
