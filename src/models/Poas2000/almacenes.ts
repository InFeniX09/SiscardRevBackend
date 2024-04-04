import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const Almacenes = db1[0].define(
  "Almacenes",
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

export default Almacenes;
