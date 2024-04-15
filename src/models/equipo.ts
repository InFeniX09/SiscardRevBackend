import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Equipo = db[0].define(
  "Equipo",
  {
    IdEquipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idMarca: {
      type: DataTypes.INTEGER,
    },
    idModelo: {
      type: DataTypes.INTEGER,
    },
    idCliente: {
      type: DataTypes.INTEGER,
    },
    Especificacion: {
      type: DataTypes.STRING,
    },
    Gamma: {
      type: DataTypes.STRING,
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

export default Equipo;
