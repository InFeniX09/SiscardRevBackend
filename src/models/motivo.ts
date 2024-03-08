import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Motivo = db[0].define(
  "Motivo",
  {
    IdMotivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Motivo: {
      type: DataTypes.STRING,
    },
    idSolicitud: {
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

export default Motivo;
