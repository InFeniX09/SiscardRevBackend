import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const TransitoSalida = db1[0].define(
  "TransitoSalida",
  {
    transitosalida_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    componente_id: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default TransitoSalida;
