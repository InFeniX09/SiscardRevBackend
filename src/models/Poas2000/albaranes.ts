import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const Albaranes = db1[0].define(
  "Albaranes",
  {
    albaran_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    dFcGeneracion: {
      type: DataTypes.DATE,
    },
    usuario_id: {
      type: DataTypes.STRING,
    },
    dFcUltimaImpresion: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Albaranes;
