import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const TipoEquipo = db[0].define(
  "TipoEquipo",
  {
    IdTipoEquipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    TipoEquipo: {
      type: DataTypes.STRING,
    },
    Clasificacion: {
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

export default TipoEquipo;
