import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Reporte = db[0].define(
  "Reporte",
  {
    IdReporte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Reporte: {
      type: DataTypes.STRING,
    },
    Query: {
      type: DataTypes.STRING,
    },
    TipoReporte: {
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

export default Reporte;
