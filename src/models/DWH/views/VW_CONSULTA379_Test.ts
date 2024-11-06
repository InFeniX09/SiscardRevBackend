import { DataTypes } from "sequelize";
import { db2 } from "../../../db/connectionDWH";

const VW_CONSULTA379_Test = db2[0].define(
  "VW_CONSULTA379_Test",
  {
    Almacen: {
      type: DataTypes.STRING,
    },
    Cantidad: {
      type: DataTypes.STRING,
    },
    Cliente: {
      type: DataTypes.STRING,
    },
    Tipo: {
      type: DataTypes.STRING,
    },
    Modelo: {
      type: DataTypes.STRING,
    },
    Componente_SAP: {
      type: DataTypes.STRING,
    },
    No_Serie: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ["Averiado/s"]: {
      type: DataTypes.STRING,
    },

    DiasEnAlmacen: {
      type: DataTypes.STRING,
    },
    Poblacion: {
      type: DataTypes.STRING,
    },
    Provincia: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,  // Para asegurarte que el nombre de la tabla no sea pluralizado
    timestamps: false,      // Desactiva createdAt y updatedAt
    indexes: [],            // Se deja vacío, sin claves primarias ni índices
  }
);

export default VW_CONSULTA379_Test;
