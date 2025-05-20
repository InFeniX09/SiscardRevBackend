"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Menu = connection_1.db[0].define("Menu", {
    IdMenu: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    Menu: {
        type: sequelize_1.DataTypes.STRING,
    },
    Ruta: {
        type: sequelize_1.DataTypes.STRING,
    },
    RutaImagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    Comando: {
        type: sequelize_1.DataTypes.STRING,
    },
    TipoMenu_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Padre_id: {
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
exports.default = Menu;
