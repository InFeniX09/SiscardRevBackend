import { DataTypes } from "sequelize";
import { db2 } from "../../../db/connectionDWH";

const Reporte_logistica_claro = db2[0].define(
  "Reporte_logistica_claro",
  {
    No_Serie: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    CM_MTA_MAC: {
      type: DataTypes.STRING,
    },
    EMTA_MTA_MAC: {
      type: DataTypes.STRING,
    },
    UNIT_ADDRESS: {
      type: DataTypes.STRING,
    },
    Almacen: {
      type: DataTypes.STRING,
    },
    sDsNIF: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    sDsZona: {
      type: DataTypes.STRING,
    },
    Componente_SAP: {
      type: DataTypes.STRING,
    },
    ['Averiado/s']: {
      type:DataTypes.STRING
    }
  },
  {
    freezeTableName: true,  // Para asegurarte que el nombre de la tabla no sea pluralizado
    timestamps: false    // Desactiva createdAt y updatedAt
  }
);

export default Reporte_logistica_claro;
