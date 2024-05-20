import { Request, Response, request, response } from "express";
import { PassThrough } from "stream";

import Mensaje from "../../models/mensaje";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import { DatabaseError, Op, Sequelize, json } from "sequelize";
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
import EquipoDescuento from "../../models/equipodescuento";
import Area from "../../models/area";
import TipoDocumento from "../../models/tipodocumento";
import Puesto from "../../models/puesto";
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

  const results = await Solicitud.findAll({
    attributes: [
      "IdSolicitud",
      "FcCreacion",
      "Estado",
    ],
    include: [
      {
        model: TipoSolicitud,
        attributes: ["TipoSolicitud"],
        required: true,
      },
      {
        model: TipoMotivo,
        attributes: ["TipoMotivo"],
        required: true,
      },
      {
        model: Usuario,
        attributes: ["Usuario", "IdUsuario"],
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

  const Query3 = results.map(result => {
    const plainResult = result.get({ plain: true });
    return {
      ...plainResult,
      TipoSolicitud: plainResult.TipoSolicitud.TipoSolicitud,
      TipoMotivo: plainResult.TipoMotivo.TipoMotivo,
      Usuario: plainResult.Usuario.Usuario,
      IdUsuario: plainResult.Usuario.IdUsuario,
    };
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

export const armarPdfSolicitudSocket = async (data: any) => {
  console.log("mbaka", data);
  console.log("papitarota");
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  const ids = data.dato.Accesorio.split(",").map(Number) || "";
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
    where: {
      IdEquipo: {
        [Op.in]: ids,
      },
    },
  });

  const equipoIds = Object.values(data.dato)
    .filter(
      (value, index) =>
        value !== "" && index !== Object.keys(data.dato).indexOf("Accesorio")
    )
    .map(Number);

  Equipo.hasMany(EquipoSerie, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query0: any = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Marca.Marca",
      "Modelo.Modelo",
      "EquipoSeries.Serie",
      "EquipoSeries.Identificador",
      "TipoEquipo.TipoEquipo",
      "EquipoSeries.TiempoVida",
      "EquipoSeries.Observacion",
    ],
    include: [
      {
        model: EquipoSerie,
        attributes: [],
        required: true,
        where: {
          IdEquipoSerie: {
            [Op.in]: equipoIds.join(",").split(",").map(Number),
          },
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
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
      },
    ],
  });

  const equipoIdsQuery0 = Query0.map((equipo: any) => equipo.IdEquipo);

  Equipo.hasMany(EquipoDescuento, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query1 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Marca.Marca",
      "Modelo.Modelo",
      "TipoEquipo.TipoEquipo",
      "EquipoDescuentos.Tiempo",
      "EquipoDescuentos.Precio",
    ],
    include: [
      {
        model: EquipoDescuento,
        attributes: [],
        required: true,
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
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
      },
    ],
    where: {
      IdEquipo: {
        [Op.in]: equipoIdsQuery0,
      },
    },
  });

  Entidad.hasMany(Usuario, { foreignKey: "Entidad_id" });
  Entidad.belongsTo(Area, { foreignKey: "Area_id" });

  const UsuarioQuery = await Entidad.findAll({
    raw: true,
    attributes: ["Area.Area", "NombreCompleto"],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: true,
        where: {
          IdUsuario: data.usuario_id,
        },
      },
      {
        model: Area,
        attributes: [],
        required: true,
      },
    ],
  });
  const UsuarioQuery1 = await Entidad.findAll({
    raw: true,
    attributes: ["Area.Area", "NombreCompleto"],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: true,
        where: {
          IdUsuario: data.datousuario,
        },
      },
      {
        model: Area,
        attributes: [],
        required: true,
      },
    ],
  });
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
      const imgPath = "src/assets/Pantalla1.png";
      doc.image(imgPath, 0, 0, {
        fit: [doc.page.width, doc.page.height],
        align: "center",
        valign: "center",
      });
      const fecha = new Date();

      // Obtener día, mes y año
      const dia = fecha.getDate().toString().padStart(2, "0"); // Obtener el día del mes (con ceros a la izquierda si es necesario)
      const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Obtener el mes (se suma 1 ya que los meses son indexados desde 0)
      const año = fecha.getFullYear();

      // Formatear la fecha como "dd/mm/yyyy"
      const fechaFormateada = `${dia}/${mes}/${año}`;

      doc.fontSize(12).text(fechaFormateada, 508, 167, { width: 400 });
      doc.fontSize(12).text(data.datosolicitud, 72, 167);
      doc.fontSize(12).text(data.datomotivo, 63, 185);

      // Empezamos con la Lógica
      let yPos = 320; // Posición inicial
      const lineSpacing = 15; // Espaciado entre líneas
      let zPos = 547; // Posición inicial

      Query0.forEach((item: any) => {
        if (item.TipoEquipo === "Chip") {
          doc.fontSize(12).text(`${item.TipoEquipo} ${item.Marca}`, 20, yPos);
        } else {
          doc
            .fontSize(12)
            .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, yPos);
        }
        doc.fontSize(12).text(`${item.Serie}`, 210, yPos);
        doc.fontSize(12).text(`${item.Identificador}`, 340, yPos);
        doc
          .fontSize(12)
          .text(`${item.TiempoVida} meses`, 475, yPos, { width: 400 });
        yPos += lineSpacing;

        if (item.TipoEquipo === "Chip") {
          doc.fontSize(12).text(`${item.TipoEquipo} ${item.Marca}`, 20, zPos);
        } else {
          doc
            .fontSize(12)
            .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, zPos);
        }

        doc.fontSize(12).text(`${item.Observacion}`, 210, zPos);

        zPos += lineSpacing;
      });
      Query3.forEach((item: any) => {
        doc.fontSize(12).text(`${item.Modelo}`, 20, yPos);
        yPos += lineSpacing;
      });

      UsuarioQuery.forEach((usuario: any) => {
        doc.fontSize(12).text(`${usuario.NombreCompleto}`, 80, 202);
        doc.fontSize(12).text(`${usuario.Area}`, 505, 190, { width: 400 });
      });
      //-------------------------------
      doc.addPage(); //PAGINA 2
      //-------------------------------
      //Fondo de Pantalla
      const imgPath1 = "src/assets/Pantalla2.png";
      doc.image(imgPath1, 0, 0, {
        fit: [doc.page.width, doc.page.height],
        align: "center",
        valign: "center",
      });

      UsuarioQuery.forEach((usuario: any) => {
        doc
          .fontSize(11)
          .text(`Recibido por: ${usuario.NombreCompleto}`, 20, 650, {
            width: 400,
          });
        doc.fontSize(11).text(`Area: ${usuario.Area}`, 20, 665, { width: 400 });

        console.log("Gonzalooooo", usuario.NombreCompleto);
      });
      UsuarioQuery1.forEach((usuario: any) => {
        doc
          .fontSize(11)
          .text(`Recibido por: ${usuario.NombreCompleto}`, 370, 650, {
            width: 400,
          });
        doc
          .fontSize(11)
          .text(`Area: ${usuario.Area}`, 370, 665, { width: 400 });
        console.log("Gonzalooooo", usuario.NombreCompleto);
      });
      let y1Pos = 250; // Posición inicial
      const line1Spacing = 15; // Espaciado entre líneas
      let z1Pos = 547; // Posición inicial

      const formattedData = Query1.map((equipo: any) => {
        return `${equipo.Tiempo}mes:S/.${equipo.Precio.toFixed(2)}`;
      }).join(";");

      console.log("sue", formattedData);

      Query0.forEach((item: any) => {
        if (item.TipoEquipo === "Chip") {
        } else {
          doc
            .fontSize(12)
            .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, y1Pos);
          doc.fontSize(12).text(`${formattedData}`, 210, y1Pos);
        }
        y1Pos += line1Spacing;
        console.log("sara", formattedData);
        console.log("sara1", `${item.TipoEquipo} ${item.Marca} ${item.Modelo}`);
      });

      doc.end();
      console.log("PDF generado con éxito");
    } catch (error) {
      console.error("Error durante la generación del PDF:", error);
      reject(error); // Rechazar la promesa en caso de error
    }
  });
};

export const listarTipoDocumento = async () => {
  const Query3 = await TipoDocumento.findAll({
    raw: true,
    attributes: ["IdTipoDocumento", "TipoDocumento", "Agrupacion", "Estado"],

    where: {},
  });

  return Query3;
};

export const listarArea = async () => {
  const Query3 = await Area.findAll({
    raw: true,
    attributes: ["IdArea", "Area", "Estado"],

    where: {},
  });

  return Query3;
};

export const listarPuesto = async (data: any) => {
  console.log('2',data);
  console.log('2',JSON.stringify(data));

  const Query3 = await Puesto.findAll({
    raw: true,
    attributes: ["IdPuesto", "Puesto", "Estado"],
    where: { Area_id: data.Area },
  });

  return Query3;
};
