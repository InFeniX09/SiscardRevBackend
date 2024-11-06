import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const VW_Clientes = db1[0].define(
  "VW_Clientes",
  {
    cliente_id: {
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

export default VW_Clientes;
