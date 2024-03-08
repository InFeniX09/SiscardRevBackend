import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Menu = db[0].define(
  "Menu",
  {
    IdMenu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Menu: {
      type: DataTypes.STRING,
    },
    Ruta: {
      type: DataTypes.STRING,
    },
    RutaImagen: {
      type: DataTypes.STRING,
    },
    Comando: {
      type: DataTypes.STRING,
    },
    idTipoMenu: {
      type: DataTypes.INTEGER,
    },
    idPadre: {
      type: DataTypes.INTEGER,
    },
    Estado: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Menu;
