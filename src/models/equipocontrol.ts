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
    Equipo_id: {
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
    Usuario_id: {
      type: DataTypes.INTEGER,
    },
    FcIngreso: {
      type: DataTypes.DATE,
    },
    FcBaja: {
      type: DataTypes.DATE,
    },
    Proveedor_id: {
      type: DataTypes.INTEGER,
    },
    Gaveta_id: {
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
