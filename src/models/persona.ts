import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Persona = db[0].define(
  "Persona",
  {
    IdPersona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    Nombres: {
      type: DataTypes.STRING,
    },
    Apellidos: {
      type: DataTypes.STRING,
    },
    NombreCompleto: {
      type: DataTypes.STRING,
    },
    Documento: {
      type: DataTypes.STRING,
    },
    idTipoDocumento: {
      type: DataTypes.NUMBER,
    },
    Correo: {
      type: DataTypes.STRING,
    },
    Genero: {
      type: DataTypes.STRING,
    },
    FcNacimiento: {
      type: DataTypes.DATE,
    },
    Telefono: {
      type: DataTypes.STRING,
    },
    idArea: {
      type: DataTypes.INTEGER,
    },
    idPuesto: {
      type: DataTypes.INTEGER,
    },
    Estado: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Persona;
