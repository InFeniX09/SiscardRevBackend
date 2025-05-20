"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Entidad = connection_1.db[0].define("Entidad", {
    IdEntidad: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombres: {
        type: sequelize_1.DataTypes.STRING,
    },
    Apellidos: {
        type: sequelize_1.DataTypes.STRING,
    },
    TipoDocumento_id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    NroDocumento: {
        type: sequelize_1.DataTypes.STRING,
    },
    Correo: {
        type: sequelize_1.DataTypes.STRING,
    },
    Telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    Ubigeo: {
        type: sequelize_1.DataTypes.STRING,
    },
    Direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    Genero: {
        type: sequelize_1.DataTypes.STRING,
    },
    FcNacimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    TipoEntidad_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    EntidadRelacion_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FcIngreso: {
        type: sequelize_1.DataTypes.DATE,
    },
    FcBaja: {
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
exports.default = Entidad;
