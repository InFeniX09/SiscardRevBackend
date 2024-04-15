import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const EquipoStock = db[0].define(
  "EquipoStock",
  {
    IdEquipoStock: {
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
    StockActual: {
      type: DataTypes.DECIMAL,
    },
    StockDisponible: {
      type: DataTypes.DECIMAL,
    },
    StockNoDisponible: {
      type: DataTypes.DECIMAL,
    },
  
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default EquipoStock;
