import { DataTypes } from "sequelize";
import { db1 } from "../../../db/connectionPoas";

const VW_SR_AlmacenxAlbaranSalida = db1[0].define(
  "VW_SR_AlmacenxAlbaranSalida",
  {
    almacen_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sDsAlmacen: {
      type: DataTypes.DATE,
    },
    cliente_id: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default VW_SR_AlmacenxAlbaranSalida;
