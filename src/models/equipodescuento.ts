import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const EquipoDescuento = db[0].define(
  "EquipoDescuento",
  {
    IdEquipoDescuento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Precio: {
      type: DataTypes.DECIMAL,
    },
    Tiempo: {
      type: DataTypes.INTEGER,
    },
    Modelo_id: {
      type: DataTypes.INTEGER,
    },
    Estado_id: {
      type: DataTypes.STRING,
    }
  
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default EquipoDescuento;
