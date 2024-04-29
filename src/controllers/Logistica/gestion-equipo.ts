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
    const preciosPorMes = data.preciosPorMes;

    // Mapear cada objeto dentro del array preciosPorMes y transformarlo según tus necesidades
    const equiposSerieJSON = preciosPorMes.map((item: any) => {
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
