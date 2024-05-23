import Usuario from "../../models/usuario";
import { Model, Op, Sequelize, json } from "sequelize";
import TipoSolicitud from "../../models/tiposolicitud";
import TipoMotivo from "../../models/tipomotivo";
import Solicitud from "../../models/solicitud";
import Ticket from "../../models/ticket";
import Marca from "../../models/marca";
import TipoEquipo from "../../models/tipoequipo";
import Modelo from "../../models/modelo";
import Equipo from "../../models/equipo";
import Cliente from "../../models/cliente";
import EquipoDescuento from "../../models/equipodescuento";
import EquipoStock from "../../models/equipostock";
import EquipoSerie from "../../models/equiposerie";
import EquipoControl from "../../models/equipocontrol";
const nodemailer = require("nodemailer");

export const enviarCorreoSocket = async (data: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "infenix.reborn@gmail.com",
      pass: "fzf zrz mhg hyq otrl",
    },
  });

  let mailOptions: any = {
    from: '"SiscardRevolution🎊" <SiscardRevolution@siscardperu.pe>', // sender address
    to: "infenix.reborn@gmail.com", // list of receivers
    cc: "",
    subject: "Pruebas Testing SR ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b> Ya estamos llegandoooooo </b>", // html body
  };
  // Si el archivo adjunto existe, añadirlo a las opciones del correo
  if (data.pdf) {
    mailOptions.attachments = [
      {
        filename: "archivo1.pdf", // Nombre del primer archivo adjunto
        content: data.pdf, // Contenido del primer archivo PDF
        encoding: "base64", // Codificación del contenido
      },
    ];
  }

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};

export const recuperarClave = async (data: any) => {
  const Query0 = await Usuario.findOne({
    where: { Correo: data.Email },
  });

  const clave = Math.floor(Math.random() * 900000) + 100000;

  if (Query0) {
    const Query1 = await Usuario.update(
      {
        ClaveTemporal: clave,
      },
      {
        where: { Correo: data.Email },
      }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "infenix.reborn@gmail.com",
      pass: "fzf zrz mhg hyq otrl",
    },
  });

  let mailOptions: any = {
    from: '"SiscardRevolution🎊"<SiscardRevolution@siscardperu.pe>', // sender address
    to: data.Email, // list of receivers
    cc: "",
    subject: "Recuperación de Clave✔", // Subject line
    html: `<div>
            <p>
            🚨Se ha solicitado una recuperación de clave, usa el siguiente token para recuperar tu contraseña:
            </p>
            <span>
              <strong>${clave}</strong>
            </span>
            <p>
              si no solicitaste este token, omite este
              mensaje, Gracias!
            </p>
          </div>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};

export const recuperarClaveToken = async (data: any) => {
  const Query0 = await Usuario.findOne({
    where: { Correo: data.Email, ClaveTemporal: data.Token },
  });
  if (Query0) {
    return "Existe";
  } else {
    return "No existe";
  }
};
export const cambioClave = async (data: any) => {
  const Query1 = await Usuario.update(
    {
      Clave: data.Clave,
    },
    {
      where: { Correo: data.Email },
    }
  );

  if (Query1) {
    return "Existe";
  } else {
    return "No existe";
  }
};

export const listarClasificacionEquipoSocket = async () => {
  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: [
      [Sequelize.literal("DISTINCT TipoEquipo.Clasificacion"), "Clasificacion"],
    ],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};
export const listarTipoEquipoSocket = async () => {
  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado"],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};
export const listarTipoEquipoxClSocket = async (data: any) => {
  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado"],
    where: {
      Estado: "A",
      Clasificacion: data.Clasificacion,
    },
  });

  return Query3;
};
export const listarMarcaSocket = async () => {
  const Query3 = await Marca.findAll({
    raw: true,
    attributes: ["IdMarca", "Marca", "Estado"],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};
export const listarModeloSocket = async () => {
  const Query3 = await Modelo.findAll({
    raw: true,
    attributes: ["IdModelo", "Modelo", "Estado"],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};
export const crearTipoEquipoSocket = async (data: any) => {
  console.log(data);
  console.log(JSON.stringify(data));

  const Query3 = await TipoEquipo.create({
    TipoEquipo: data.TipoEquipo,
    Clasificacion: data.Clasificacion,
  });

  return Query3;
};
export const crearMarcaSocket = async (data: any) => {
  console.log(data);
  console.log(JSON.stringify(data));

  const Query3 = await Marca.create({
    Marca: data.Marca,
  });

  return Query3;
};
export const crearModeloSocket = async (data: any) => {
  console.log(data);
  console.log(JSON.stringify(data));

  const Query3 = await Modelo.create({
    Modelo: data.Modelo,
  });

  return Query3;
};
export const crearEquipoSocket = async (data: any) => {
  console.log(data);
  console.log(JSON.stringify(data));

  const Query3 = await Equipo.create({
    Cliente_id: data.Cliente,
    Marca_id: data.Marca,
    Modelo_id: data.Modelo,
    TipoEquipo_id: data.TipoEquipo,
    Especificacion: data.Especificacion,
    Gamma: data.Gamma,
  });

  return Query3;
};
export const crearEquipoDescuentoSocket = async (data: any) => {
  try {
    // Extraer el array de preciosPorMes del objeto data
    const test = data.test;

    // Mapear cada objeto dentro del array preciosPorMes y transformarlo según tus necesidades
    const equiposSerieJSON = test.map((item: any) => {
      return {
        Equipo_id: item.Equipo,
        Tiempo: item.Tiempo,
        Precio: item.Precio,
      };
    });

    // Insertar los datos masivamente usando Sequelize
    await EquipoDescuento.bulkCreate(equiposSerieJSON);

    console.log("Carga masiva completada con éxito");
  } catch (error) {
    console.error("Error en la carga masiva:", error);
  }
};
export const crearEquipoStockSocket = async (data: any) => {
  try {
    if (data.Clasificacion === "Seriado") {
      const test = data.test;
      console.log("yara1");
      const equiposSerieJSON = test.map((item: any) => {
        return {
          Equipo_id: item.Equipo,
          Serie: item.Serie,
          Usuario_id: 5,
          TiempoVida: 0,
        };
      });

      const insercionmasiva = await EquipoSerie.bulkCreate(equiposSerieJSON);

      const equiposSerieJSON1 = insercionmasiva.map((item: any) => {
        return {
          EquipoSerie_id: item.IdEquipoSerie,
          Usuario_id: 5,
          Observacion: "Ingreso de Stock por Software",
        };
      });
      await EquipoControl.bulkCreate(equiposSerieJSON1);

      const stockActual: any = await EquipoStock.findOne({
        where: { Equipo_id: data.test[0].Equipo, Usuario_id: 5 },
      });

      if (!stockActual) {
        await EquipoStock.create({
          StockDisponible: equiposSerieJSON.length,
          StockNoDisponible: 0,
          Equipo_id: data.test[0].Equipo,
          Usuario_id: 5,
        });
      } else {
        await EquipoStock.update(
          {
            StockDisponible:
              stockActual.StockDisponible + equiposSerieJSON.length,
          },
          {
            where: { Equipo_id: data.test[0].Equipo, Usuario_id: 5 },
          }
        );
      }
    } else if (data.Clasificacion[0] === "Accesorio") {
      const stockActual: any = await EquipoStock.findOne({
        where: { Equipo_id: data.IdEquipo, Usuario_id: 5 },
      });

      if (!stockActual) {
        await EquipoStock.create({
          StockDisponible: data.Cantidad,
          StockNoDisponible: 0,
          Equipo_id: data.IdEquipo,
          Usuario_id: 5,
        });
      } else {
        await EquipoStock.update(
          {
            StockDisponible:
              stockActual.StockDisponible + parseFloat(data.Cantidad),
          },
          {
            where: { Equipo_id: data.IdEquipo, Usuario_id: 5 },
          }
        );
      }
    }
  } catch (error) {
    console.error("Error en la carga masiva:", error);
  }
};

export const listarEquipoSocket = async () => {
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Marca.Marca",
      "Modelo.Modelo",
      "Cliente.CodCliente",
      "Especificacion",
      "Gamma",
      "Estado",
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
      Estado: "A",
    },
  });

  return Query3;
};
export const listarEquipoxClxTCSocket = async (data: any) => {
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Marca.Marca",
      "Modelo.Modelo",
      "Cliente.CodCliente",
      "Especificacion",
      "Gamma",
      "Estado",
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
      Estado: "A",
      Cliente_id: data.Cliente,
      TipoEquipo_id: data.TipoEquipo,
    },
  });

  return Query3;
};

export const listarEquipoDescuentoSocket = async () => {
  EquipoDescuento.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoDescuento.findAll({
    raw: true,
    attributes: [
      "IdEquipoDescuento",
      "Equipo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Equipo.Cliente.CodCliente",
      "Tiempo",
      "Precio",
      "Estado",
    ],
    include: [
      {
        model: Equipo,
        attributes: [],
        required: true,
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
      },
    ],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};

export const listarMarcaxTipoEquipo = async () => {
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      [Sequelize.literal("DISTINCT Marca.IdMarca"), "IdMarca"],
      "Marca.Marca",
      "TipoEquipo.TipoEquipo",
      "Marca.Estado",
    ],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
      },
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
        where: {
          TipoEquipo: "Celular",
        },
      },
    ],
    where: {
      Estado: "A",
      Cliente_id: "1",
    },
  });
  console.log("tiago", Query3);

  return Query3;
};

export const listarModeloxMarca = async () => {
  Equipo.belongsTo(Modelo, { foreignKey: "Marca_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      [Sequelize.literal("DISTINCT Marca.IdMarca"), "IdMarca"],
      "Marca.Marca",
      "TipoEquipo.TipoEquipo",
      "Marca.Estado",
    ],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado: "A",
    },
  });
  console.log("tiago", Query3);

  return Query3;
};
