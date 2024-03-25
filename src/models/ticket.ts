import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Ticket = db[0].define(
  "Ticket",
  {
    IdTicket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Asunto: {
      type: DataTypes.STRING,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    idArea: {
      type: DataTypes.INTEGER,
    },
    idResponsable: {
      type: DataTypes.INTEGER,
    },
    idTicketcc: {
      type: DataTypes.INTEGER,
    },
    FcCreacion: {
      type: DataTypes.DATE,
    },
    FcCierre: {
      type: DataTypes.DATE,
    },
    idPrioridad: {
      type: DataTypes.INTEGER,
    },
    Estado: {
      type: DataTypes.STRING,
    },
    UltimaFechMod: {
      type: DataTypes.DATE,
    },
    UltimoUserMod: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Ticket;
