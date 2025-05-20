"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const MenuAsignado = connection_1.db[0].define("MenuAsignado", {
    IdMenuAsignado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    Menu_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    PerfilUsuario_id: {
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
exports.default = MenuAsignado;
