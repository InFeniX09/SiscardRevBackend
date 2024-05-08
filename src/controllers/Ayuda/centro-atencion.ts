import { Request, Response, request, response } from "express";
import { PassThrough } from "stream";

import Mensaje from "../../models/mensaje";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import { Op, Sequelize, json } from "sequelize";
import TipoSolicitud from "../../models/tiposolicitud";
import TipoMotivo from "../../models/tipomotivo";
import Solicitud from "../../models/solicitud";
import Ticket from "../../models/ticket";
import Equipo from "../../models/equipo";
import Marca from "../../models/marca";
import Modelo from "../../models/modelo";
import Cliente from "../../models/cliente";
import EquipoStock from "../../models/equipostock";
import EquipoSerie from "../../models/equiposerie";
import TipoEquipo from "../../models/tipoequipo";
import PDFDocument from "pdfkit";
import fs from "fs";
export const listarTipoSolicitudSocket = async () => {
  const Query3 = await TipoSolicitud.findAll({
    raw: true,
    attributes: ["IdTipoSolicitud", "TipoSolicitud", "Estado"],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};

export const listarTipoMotivoSocket = async (data: any) => {
  let pTipoSolicitud_id = data.TipoSolicitud_id;

  const Query3 = await TipoMotivo.findAll({
    raw: true,
    attributes: ["IdTipoMotivo", "TipoMotivo", "TipoSolicitud_id", "Estado"],
    where: {
      Estado: "A",
      TipoSolicitud_id: pTipoSolicitud_id,
    },
  });

  return Query3;
};

export const listarSolicitud = async (data: any) => {
  let pUsuario_id = data.Usuario_id;

  Solicitud.belongsTo(TipoSolicitud, { foreignKey: "TipoSolicitud_id" });
  Solicitud.belongsTo(TipoMotivo, { foreignKey: "TipoMotivo_id" });
  Solicitud.belongsTo(Usuario, { foreignKey: "Usuario_id" });

  const Query3 = await Solicitud.findAll({
    raw: true,
    attributes: [
      "IdSolicitud",
      "TipoSolicitud.TipoSolicitud",
      "TipoMotivo.TipoMotivo",
      "Usuario.Usuario",
      "Estado",
    ],
    include: [
      {
        model: TipoSolicitud,
        attributes: [],
        required: true,
      },
      {
        model: TipoMotivo,
        attributes: [],
        required: true,
      },
      {
        model: Usuario,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado: "A",
      Usuario_id: {
        [Op.like]: pUsuario_id
          ? Sequelize.literal(`ISNULL('${pUsuario_id}', '%')`)
          : "%",
      },
    },
  });

  return Query3;
};
//Listo
export const crearSolicitudSocket = async (data: any) => {
  let pTipoSolicitud_id = data.TipoSolicitud_id
    ? parseInt(data.TipoSolicitud_id)
    : null;
  let pTipoMotivo_id = data.TipoMotivo_id ? parseInt(data.TipoMotivo_id) : null;
  let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;

  const Query3 = await Solicitud.create({
    TipoSolicitud_id: pTipoSolicitud_id,
    TipoMotivo_id: pTipoMotivo_id,
    Usuario_id: pUsuario_id,
  });

  return Query3;
};

export const listarTicketSocket = async (data: any) => {
  let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;

  const Query3 = await Ticket.findAll({
    raw: true,
    attributes: ["IdTicket", "Asunto", "Descripcion", "Usuario_id"],
    where: {
      Estado: "A",
      Usuario_id: {
        [Op.like]: pUsuario_id
          ? Sequelize.literal(`ISNULL('${pUsuario_id}', '%')`)
          : "%",
      },
    },
  });

  return Query3;
};

export const crearTicketSocket = async (data: any) => {
  let pasunto = data.Asunto?.toString();
  let pdescripcion = data.Descripcion?.toString();
  let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;
  let pidArea = data.idArea ? parseInt(data.idArea) : null;
  let pidTicketcc = data.idTicketcc ? parseInt(data.idTicketcc) : null;
  let pidPrioridad = data.idPrioridad ? parseInt(data.idPrioridad) : null;

  const Query3 = await Ticket.create({
    Asunto: pasunto,
    Descripcion: pdescripcion,
    idUsuario: pUsuario_id,
    idArea: pidArea,
    idTicketcc: pidTicketcc,
    idPrioridad: pidPrioridad,
  });

  return Query3;
};

export const listarEquipoxClxTexUsuSocket = async (data: any) => {
  Equipo.hasMany(EquipoStock, { foreignKey: "Equipo_id" });
  Equipo.hasMany(EquipoSerie, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Marca.Marca",
      "Modelo.Modelo",
      "EquipoSeries.Serie",
      "EquipoSeries.IdEquipoSerie",
    ],
    include: [
      {
        model: EquipoStock,
        required: true,
        attributes: [],
        where: {
          Usuario_id: 5,
        },
      },
      {
        model: EquipoSerie,
        attributes: [],
        required: true,
      },
      {
        model: TipoEquipo,
        required: true,
        attributes: [],
        where: {
          Clasificacion: "Seriado",
          TipoEquipo: data.TipoEquipo,
        },
      },
      {
        model: Marca,
        attributes: [],
        required: true,
      },
      {
        model: Modelo,
        attributes: [],
        required: true,
      },
      {
        model: Cliente,
        attributes: [],
        required: true,
      },
    ],
    where: {},
  });

  return Query3;
};

export const listarAccesorioxClxTexUsuSocket = async () => {
  Equipo.hasMany(EquipoStock, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Marca.Marca",
      "Modelo.Modelo",
    ],
    include: [
      {
        model: EquipoStock,
        required: true,
        attributes: [],
        where: {
          Usuario_id: 5,
        },
      },
      {
        model: TipoEquipo,
        required: true,
        attributes: [],
        where: {
          Clasificacion: "Accesorio",
        },
      },
      {
        model: Marca,
        attributes: [],
        required: true,
      },
      {
        model: Modelo,
        attributes: [],
        required: true,
      },
      {
        model: Cliente,
        attributes: [],
        required: true,
      },
    ],
    where: {},
  });

  return Query3;
};

export const armarPdfSolicitudSocket = (data: any) => {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
      });

      const chunks: Uint8Array[] = []; // Array para almacenar los chunks de datos del PDF

      doc.on("data", (chunk: Uint8Array) => {
        chunks.push(chunk); // Almacenar cada chunk de datos del PDF
      });

      doc.on("end", () => {
        const pdfBytes = Buffer.concat(chunks); // Concatenar los chunks en un buffer
        resolve(new Uint8Array(pdfBytes)); // Convertir el buffer en Uint8Array y resolver la promesa
      });

      // Insertar la imagen
      const imgPath = "src/db/Fondopdf.png";
      doc.image(imgPath, {
        fit: [250, 300],
        align: "center",
        valign: "center",
      });

      // Agregar contenido adicional al PDF
      doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill("#FF3300");

      // Finalizar el documento PDF
      doc.end();
      console.log("PDF generado con éxito");
    } catch (error) {
      console.error("Error durante la generación del PDF:", error);
      reject(error); // Rechazar la promesa en caso de error
    }
  });
};
