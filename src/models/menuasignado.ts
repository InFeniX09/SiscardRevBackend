import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const MenuAsignado = db[0].define(
  "MenuAsignado",
  {
    IdMenuAsignado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Menu_id: {
      type: DataTypes.INTEGER,
    },
    Usuario_id: {
      type: DataTypes.INTEGER,
    },
    PerfilUsuario_id: {
      type: DataTypes.INTEGER,
    },
    Estado_id: {
      type: DataTypes.STRING,
    },
    UltimaFechMod: {
      type: DataTypes.DATE,
    },
    UltimoUserMod: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default MenuAsignado;
