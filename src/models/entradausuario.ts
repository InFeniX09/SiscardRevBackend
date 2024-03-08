import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const EntradaUsuario = db[0].define(
  "EntradaUsuario",
  {
    IdEntradaUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    UsuarioIp: {
      type: DataTypes.STRING,
    },
    UsuarioEntrada: {
      type: DataTypes.DATE,
    },
    UsuarioSalida: {
      type: DataTypes.DATE,
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

export default EntradaUsuario;
