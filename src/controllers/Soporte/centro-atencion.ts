import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";

import { Op } from "sequelize";
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

import EquipoDescuento from "../../models/equipodescuento";
import Area from "../../models/area";
import TipoDocumento from "../../models/tipodocumento";
import Puesto from "../../models/puesto";
import VW_SR_MIS_TICKETS from "../../models/SR/VW_SR_MIS_TICKETS";

import Prioridad from "../../models/priodidad";
import { request, Response, response } from "express";
import DatosSolicitud from "../../models/datosSolicitud";
import PerfilUsuario from "../../models/perfilusuario";
import Perfil from "../../models/perfil";
import { result } from "underscore";

export const listarTipoSolicitudSocket = async () => {
  const Query3 = await TipoSolicitud.findAll({
    raw: true,
    attributes: ["IdTipoSolicitud", "TipoSolicitud", "Estado_id"],
    where: {
      Estado_id: "1",
    },
  });

  return Query3;
};

export const listarTipoMotivoSocket = async (data: any) => {
  let pTipoSolicitud_id = data.TipoSolicitud_id;

  const Query3 = await TipoMotivo.findAll({
    raw: true,
    attributes: ["IdTipoMotivo", "TipoMotivo", "TipoSolicitud_id", "Estado_id"],
    where: {
      Estado_id: "1",
      TipoSolicitud_id: pTipoSolicitud_id,
    },
  });

  return Query3;
};

export const listarPersonalSolicitud = async (data: any) => {
  let pUsuario_id = data.Usuario_id;

  Solicitud.belongsTo(TipoSolicitud, { foreignKey: "TipoSolicitud_id" });
  Solicitud.belongsTo(TipoMotivo, { foreignKey: "TipoMotivo_id" });
  Solicitud.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  Solicitud.belongsTo(DatosSolicitud, { foreignKey: "IdSolicitud" });

  const results = await Solicitud.findAll({
    attributes: ["IdSolicitud", "FcCreacion", "Estado_id"],
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
      {
        model: DatosSolicitud,
        attributes: ["Nombre"],
        required: true,
      },
    ],
    where: {
      Estado_id: "1",
      Usuario_id: pUsuario_id,
    },
  });

  const Query3 = results.map((result) => {
    const plainResult = result.get({ plain: true });
    return {
      ...plainResult,
      TipoSolicitud: plainResult.TipoSolicitud.TipoSolicitud,
      TipoMotivo: plainResult.TipoMotivo.TipoMotivo,
      Usuario: plainResult.Usuario.Usuario,
      IdUsuario: plainResult.Usuario.IdUsuario,
      Nombre: plainResult.DatosSolicitud.Nombre,
    };
  });

  return Query3;
};

//TODOS
//PONER EL NOMBRE
export const listarTodosSolicitud = async (data: any) => {
  Solicitud.belongsTo(TipoSolicitud, { foreignKey: "TipoSolicitud_id" });
  Solicitud.belongsTo(TipoMotivo, { foreignKey: "TipoMotivo_id" });
  Solicitud.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  Solicitud.belongsTo(DatosSolicitud, { foreignKey: "IdSolicitud" });

  const results = await Solicitud.findAll({
    attributes: ["IdSolicitud", "FcCreacion", "Estado_id"],
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
      {
        model: DatosSolicitud,
        attributes: ["Nombre"],
        required: true,
      },
    ],
    where: {
      Estado_id: "1",
    },
  });

  const Query3 = results.map((result) => {
    const plainResult = result.get({ plain: true });
    return {
      ...plainResult,
      TipoSolicitud: plainResult.TipoSolicitud.TipoSolicitud,
      TipoMotivo: plainResult.TipoMotivo.TipoMotivo,
      Usuario: plainResult.Usuario.Usuario,
      IdUsuario: plainResult.Usuario.IdUsuario,
      Nombre: plainResult.DatosSolicitud.Nombre,
    };
  });

  return Query3;
};
//Listo
export const crearSolicitudSocket = async (data: any) => {
  try {
    const Query3 = await Solicitud.create({
      TipoSolicitud_id: data.TipoSolicitud_id,
      TipoMotivo_id: data.TipoMotivo_id,
      Usuario_id: data.Usuario_id,
      Cliente_id: data.Cliente_id,
      Estado_id: "1",
    });

    const Query4 = await DatosSolicitud.create({
      //datos
      Nombre: data.Nombre,
      Dni: data.Dni,
      Puesto: data.Rol,
    });

    return { msg: "CREADO EN DATOS SOLICITUD", data: data };
  } catch (error) {
    console.log(error);
    return { msg: "HUBO UN ERROR", error };
  }

  //agregar los datos extras
};

export const listarIdEntidad = async (data: any) => {
  const Query3 = await Entidad.findOne({
    raw: true,
    attributes: ["IdEntidad"],
    where: {
      NroDocumento: data,
    },
  });

  return Query3;
};

export const listarTicketPersonalSocket = async (data: any) => {
  let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;
  const Query3 = await VW_SR_MIS_TICKETS.findAll({
    raw: true,
    where: {
      Usuario_id: pUsuario_id,
    },
  });

  return Query3;
};

export const listarTicketTodosSocket = async (data: string) => {
  Ticket.belongsTo(Prioridad, { foreignKey: "idPrioridad" });
  Ticket.belongsTo(Area, { foreignKey: "Area_id" });
  const results = await Ticket.findAll({
    attributes: [
      "IdTicket",
      "Asunto",
      "Descripcion",
      "FcCreacion",
      "Usuario_id",
    ],
    include: [
      {
        model: Prioridad,
        attributes: ["Prioridad"],
      },
      {
        model: Area,
        attributes: ["Area"],
      },
    ],
    where: {
      Estado_id: "3",
      Area_id: data,
      Responsable_id: {
        [Op.eq]: null,
      },
    },
  });

  const Query3 = results.map((result) => {
    const plainResult = result.get({ plain: true });
    return {
      ...plainResult,
      IdTicket: plainResult.IdTicket,
      Asunto: plainResult.Asunto,
      Descripcion: plainResult.Descripcion,
      FcCreacion: plainResult.FcCreacion,
      Area_id: plainResult.Area_id,
      Usuario_id: plainResult.Usuario_id,
      Prioridad: plainResult.Prioridad.Prioridad,
      Area: plainResult.Area.Area,
    };
  });

  return Query3;
};

export const crearTicketSocket = async (data: any) => {
  const Query3 = await Ticket.create({
    Asunto: data.Asunto,
    Descripcion: data.Descripcion,
    Usuario_id: data.Usuario_id,
    Area_id: data.idArea,
    Tickectcc_id: null,
    idPrioridad: data.idPrioridad,
    Estado_id: "3",
  });

  return Query3;
};

export const actualizarResponsableTicket = async (
  idTicket: any,
  nuevosDatos: any
) => {
  const Query3 = await Ticket.update(nuevosDatos, {
    where: {
      IdTicket: idTicket,
    },
  });

  return Query3;
};

export const listarTicketResponsable = async (idResponsable: any) => {
  Ticket.belongsTo(Prioridad, { foreignKey: "idPrioridad" });
  Ticket.belongsTo(Area, { foreignKey: "Area_id" });
  const results = await Ticket.findAll({
    attributes: [
      "IdTicket",
      "Asunto",
      "Descripcion",
      "FcCreacion",
      "Usuario_id",
    ],
    include: [
      {
        model: Prioridad,
        attributes: ["Prioridad"],
      },
      {
        model: Area,
        attributes: ["Area"],
      },
    ],
    where: {
      Responsable_id: idResponsable,
    },
  });

  const Query3 = results.map((result) => {
    const plainResult = result.get({ plain: true });
    return {
      ...plainResult,
      IdTicket: plainResult.IdTicket,
      Asunto: plainResult.Asunto,
      Descripcion: plainResult.Descripcion,
      FcCreacion: plainResult.FcCreacion,
      Area_id: plainResult.Area_id,
      Usuario_id: plainResult.Usuario_id,
      Prioridad: plainResult.Prioridad.Prioridad,
      Area: plainResult.Area.Area,
    };
  });

  return Query3;
};

export const areaUsuario = async (idUsuario: any) => {
  const Query3 = await PerfilUsuario.findOne({
    attributes: ["Perfil_id"],
    where: {
      Usuario_id: idUsuario,
    },
  });

  const area = await Perfil.findOne({
    attributes: ["Area_id"],
    where: {
      IdPerfil: Query3?.dataValues.Perfil_id,
    },
  });

  return area?.dataValues.Area_id;
};

export const asignarEquipos = async (data: any) => {
  try {
    const entidad = await Entidad.findOne({
      attributes: ["IdEntidad"],
      where: [
        {
          NroDocumento: data.nroDni,
        },
      ],
    });

    if (!entidad) {
      throw new Error(
        "Entidad no encontrada para el número de DNI proporcionado."
      );
    }

    const idEntidad = entidad.dataValues.IdEntidad;

    const whereConditions: any = {
      [Op.or]: [],
    };

    // Agregar condiciones solo si los valores están definidos y no son vacíos

    if (data.celular) {
      whereConditions[Op.or].push({ id_equipo: data.celular });
    }
    if (data.laptop) {
      whereConditions[Op.or].push({ id_equipo: data.laptop });
    }
    if (data.chip) {
      whereConditions[Op.or].push({ id_equipo: data.chip });
    }

    if (whereConditions[Op.or].length === 0) {
      throw new Error("No hay equipos válidos para actualizar");
    }

    const [affectedRows] = await Equipo.update(
      {
        id_entidad: idEntidad,
        id_estado: "9",
      },
      {
        where: whereConditions,
      }
    );

    if (affectedRows === 0) {
      throw new Error(
        "No se encontraron equipos que coincidan con los criterios de actualización."
      );
    }

    const [solicitudUpdated] = await Solicitud.update(
      { Estado_id: "2" },
      {
        where: {
          IdSolicitud: data.nroSolicitud,
        },
      }
    );

    if (solicitudUpdated === 0) {
      throw new Error(
        "No se encontró ninguna solicitud para actualizar con el ID proporcionado."
      );
    }
    //retornar success y ya estaria.

    return { success: true, affectedRows, solicitudUpdated };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en la asignación de equipos:", error.message);
      return { error: error.message };
    } else {
      console.error("Error desconocido:", error);
      return { error: "Error desconocido" };
    }
  }
};

export const listarEquipoxClxTexUsuSocket = async (data: any) => {
  Equipo.belongsTo(Modelo, { foreignKey: "id_modelo" });
  Equipo.belongsTo(Marca, { foreignKey: "id_marca" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "IdTipoEquipo" });

  try {
    const Query3 = await Equipo.findAll({
      attributes: ["id_equipo", "equipo_imei"],
      include: [
        {
          model: Modelo,
          attributes: ["Modelo"],
          required: true,
        },
        {
          model: Marca,
          attributes: ["Marca"],
          required: true,
          include: [
            {
              model: TipoEquipo,
              attributes: ["TipoEquipo"],
              where: {
                TipoEquipo: data.TipoEquipo,
              },
            },
          ],
        },
      ],
      where: {
        [Op.or]: [{ id_estado: "7" }, { id_estado: "8" }],
      },
    });

    const results = Query3.map((result) => {
      const plainResult = result.get({ plain: true });
      return {
        ...plainResult,
        id_equipo: plainResult.id_equipo,
        equipo_imei: plainResult.equipo_imei,
        Modelo: plainResult.Modelo.Modelo,
        Marca: plainResult.Marca.Marca,
      };
    });

    return results;
  } catch (error) {
    return error;
  }
};

export const listarAccesorioxClxTexUsuSocket = async () => {
  Equipo.hasMany(EquipoStock, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Modelo.Marca.Marca",
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
        model: Modelo,
        attributes: [],
        required: true,
        include: [
          {
            model: Marca,
            attributes: [],
            required: true,
            include: [
              {
                model: TipoEquipo,
                attributes: [],
                required: true,
                where: {
                  Clasificacion: "Accesorio",
                },
              },
            ],
          },
        ],
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
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  const ids = data.dato.Accesorio.split(",").map(Number) || "";
  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Modelo.Marca.Marca",
      "Modelo.Modelo",
    ],
    include: [
      {
        model: Modelo,
        attributes: [],
        required: true,
        include: [{ model: Marca, attributes: [], required: true }],
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
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query0: any = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Modelo.Marca.Marca",
      "Modelo.Modelo",
      "EquipoSeries.Serie",
      "EquipoSeries.Identificador",
      "Modelo.Marca.TipoEquipo.TipoEquipo",
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
        model: Modelo,
        attributes: [],
        required: true,
        include: [
          {
            model: Marca,
            attributes: [],
            required: true,
            include: [{ model: TipoEquipo, attributes: [], required: true }],
          },
        ],
      },
      {
        model: Cliente,
        attributes: [],
        required: true,
      },
    ],
  });

  const equipoIdsQuery0 = Query0.map((equipo: any) => equipo.IdEquipo);
  Equipo.hasMany(EquipoDescuento, { foreignKey: "Equipo_id" });
  Equipo.hasMany(EquipoSerie, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query1 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Modelo.Marca.Marca",
      "Modelo.Modelo",
      "Modelo.Marca.TipoEquipo.TipoEquipo",
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
        model: Cliente,
        attributes: [],
        required: true,
      },
      {
        model: Modelo,
        attributes: [],
        required: true,
        include: [
          {
            model: Marca,
            attributes: [],
            required: true,
            include: [{ model: TipoEquipo, attributes: [], required: true }],
          },
        ],
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
      });
      let y1Pos = 250; // Posición inicial
      const line1Spacing = 15; // Espaciado entre líneas
      let z1Pos = 547; // Posición inicial

      const formattedData = Query1.map((equipo: any) => {
        return `${equipo.Tiempo}mes:S/.${equipo.Precio.toFixed(2)}`;
      }).join(";");

      Query0.forEach((item: any) => {
        if (item.TipoEquipo === "Chip") {
        } else {
          doc
            .fontSize(12)
            .text(`${item.TipoEquipo} ${item.Marca} ${item.Modelo}`, 20, y1Pos);
          doc.fontSize(12).text(`${formattedData}`, 210, y1Pos);
        }
        y1Pos += line1Spacing;
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
    attributes: ["IdTipoDocumento", "TipoDocumento", "Agrupacion", "Estado_id"],
    where: {},
  });
  return Query3;
};

export const listarAreaSocket = async (req = request, res = response) => {
  const Query3 = await Area.findAll({
    raw: true,
    attributes: ["IdArea", "Area", "Estado_id"],
    where: {},
  });

  return Query3;
};

export const listarArea = async (req = request, res = response) => {
  const Query3 = await Area.findAll({
    raw: true,
    attributes: ["IdArea", "Area", "Estado_id"],
    where: {},
  });

  if (Query3) {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      return res.status(400).json({
        ok: false,
        msg: "Error de conexión",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: "Error de conexión",
    });
  }
};

export const listarPrioridad = async (req = request, res = response) => {
  const Query3 = await Prioridad.findAll({
    raw: true,
    attributes: ["IdPrioridad", "Prioridad"],
    where: {},
  });
  if (Query3) {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      return res.status(400).json({
        ok: false,
        msg: "Error de conexión",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: "Error de conexión",
    });
  }
};

export const listarPuesto = async (data: any) => {
  const Query3 = await Puesto.findAll({
    raw: true,
    attributes: ["IdPuesto", "Puesto", "Estado_id"],
    where: { Area_id: data.Area },
  });
  return Query3;
};

export const listarSolicitudXId = async (data: any) => {
  Solicitud.belongsTo(TipoMotivo, { foreignKey: "TipoMotivo_id" });
  Solicitud.belongsTo(TipoSolicitud, { foreignKey: "TipoSolicitud_id" });
  Solicitud.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  const Query3 = await Solicitud.findAll({
    raw: true,
    attributes: [
      "TipoSolicitud.IdTipoSolicitud",
      "TipoMotivo.IdTipoMotivo",
      "TipoSolicitud.TipoSolicitud",
      "TipoMotivo.TipoMotivo",
      "Usuario.Usuario",
      "FcCreacion",
      "Estado_id",
    ],
    include: [
      { model: TipoSolicitud, attributes: [], required: true },
      { model: TipoMotivo, attributes: [], required: true },
      { model: Usuario, attributes: [], required: true },
    ],
    where: { IdSolicitud: data.IdSolicitud },
  });
  return Query3;
};

export const listarDatosSolicitud = async (data: any) => {
  const Query3 = await DatosSolicitud.findOne({
    raw: true,
    attributes: ["Nombre", "Dni", "Puesto"],
    where: { IdSolicitud: data.IdSolicitud },
  });
  return Query3;
};
