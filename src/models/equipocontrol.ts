import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const EquipoControl = db[0].define(
  "EquipoControl",
  {
    IdEquipoControl: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EquipoSerie_id: {
      type: DataTypes.INTEGER,
    },
    Usuario_id: {
      type: DataTypes.INTEGER,
    },
    FcMovimiento: {
      type: DataTypes.DATE,
    },
    Observacion: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default EquipoControl;
