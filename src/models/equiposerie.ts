import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const EquipoSerie = db[0].define(
  "EquipoSerie",
  {
    IdEquipoSerie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Equipo_id: {
      type: DataTypes.INTEGER,
    },
    Usuario_id: {
      type: DataTypes.INTEGER,
    },
    Serie: {
      type: DataTypes.STRING,
    },
    FcIngreso: {
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

export default EquipoSerie;
