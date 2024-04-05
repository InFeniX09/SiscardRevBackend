import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const Zonas = db1[0].define(
  "Zonas",
  {
    zona_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sDsCliente: {
      type: DataTypes.STRING,
    },
    sDsNif: {
      type: DataTypes.STRING,
    },
    sDsDireccion: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Zonas;
