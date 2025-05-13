import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const fichasAlmacen = db1[0].define(
  "fichasAlmacen",
  {
    almacen_id: {
      type: DataTypes.STRING,
    },
    componente_id: {
      type: DataTypes.STRING,
    },
    nExActuales: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default fichasAlmacen;
