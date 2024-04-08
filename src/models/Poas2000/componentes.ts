import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const componentes = db1[0].define(
  "componentes",
  {
    componente_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sDsComponente: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default componentes;
