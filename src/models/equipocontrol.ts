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
    idEquipo: {
      type: DataTypes.INTEGER,
    },
    Serie: {
      type: DataTypes.STRING,
    },
    Identificacion: {
      type: DataTypes.STRING,
    },
    TiempoVida: {
      type: DataTypes.NUMBER,
    },
    FcAsignado: {
      type: DataTypes.DATE,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    FcIngreso: {
      type: DataTypes.DATE,
    },
    FcBaja: {
      type: DataTypes.DATE,
    },
    idProveedor: {
      type: DataTypes.INTEGER,
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
