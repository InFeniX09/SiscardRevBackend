import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const Stock = db1[0].define(
  "Stock",
  {
    stock_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    componente_id: {
      type: DataTypes.STRING,
    },
    sNmSerie: {
      type: DataTypes.STRING,
    },
    estado_id: {
      type: DataTypes.NUMBER,
    },
    dFcEntrada: {
      type: DataTypes.DATE,
    },
    dFcGarantiaInicio: {
      type: DataTypes.DATE,
    },
    dFcGarantiaFin: {
      type: DataTypes.DATE,
    },
    dFcNoRecupero: {
      type: DataTypes.DATE,
    },
    dFcRecupero: {
      type: DataTypes.DATE,
    },
    dFcUltMovimiento: {
      type: DataTypes.DATE,
    },
    sNmFirmware: {
      type: DataTypes.STRING,
    },
    sNmSoftware: {
      type: DataTypes.STRING,
    },
    ubicacion_id: {
      type: DataTypes.STRING,
    },
    sNmTerminal: {
      type: DataTypes.STRING,
    },
    bVerificado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Stock;
