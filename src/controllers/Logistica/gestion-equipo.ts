import Usuario from "../../models/usuario";
import { Model, Op, Sequelize, json } from "sequelize";
import Marca from "../../models/marca";
import TipoEquipo from "../../models/tipoequipo";
import Modelo from "../../models/modelo";
import Equipo from "../../models/equipo";
import Cliente from "../../models/cliente";
import EquipoDescuento from "../../models/equipodescuento";
import EquipoStock from "../../models/equipostock";
import EquipoSerie from "../../models/equiposerie";
import EquipoControl from "../../models/equipocontrol";
import { where } from "underscore";


export const listarClasificacionEquipoSocket = async () => {
  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: [
      [Sequelize.literal("DISTINCT TipoEquipo.Clasificacion"), "Clasificacion"],
    ],
    where: {
      Estado_id: "1",
    },
  });
  return Query3;
};
export const listarTipoEquipoSocket = async () => {
  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion"],
    where: {
      Estado_id: "1",
    },
  });
  return Query3;
};
export const listarTipoEquipoxClSocket = async (data: any) => {
  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado_id"],
    where: {
      Estado_id: "1",
      Clasificacion: data.Clasificacion,
    },
  });
  return Query3;
};
export const listarMarcaSocket = async () => {
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  const Query3 = await Marca.findAll({
    raw: true,
    attributes: [
      "IdMarca",
      "TipoEquipo.Clasificacion",
      "TipoEquipo.TipoEquipo",
      "Marca",
      "Estado_id",
    ],
    include: [
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado_id: "1",
    },
  });
  return Query3;
};
export const listarModeloSocket = async () => {
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  const Query3 = await Modelo.findAll({
    raw: true,
    attributes: [
      "IdModelo",
      "Marca.TipoEquipo.TipoEquipo",
      "Marca.Marca",
      "Modelo",
      "Estado_id",
    ],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
        include: [{ model: TipoEquipo, attributes: [], required: true }],
      },
    ],
    where: {
      Estado_id: "1",
    },
  });
  return Query3;
};
export const crearTipoEquipoSocket = async (data: any) => {
  const Query0 = await TipoEquipo.findOne({
    where: { TipoEquipo: data.TipoEquipo, Clasificacion: data.Clasificacion },
  });
  if (Query0) {
    return { msg: "Existe" };
  } else {
    const Query3 = await TipoEquipo.create({
      TipoEquipo: data.TipoEquipo,
      Clasificacion: data.Clasificacion,
    });
    return { msg: "NoExiste", data: Query3 };
  }
};
export const crearMarcaSocket = async (data: any) => {
  const Query0 = await Marca.findOne({
    where: { Marca: data.Marca, TipoEquipo_id: data.TipoEquipo },
  });
  if (Query0) {
    return { msg: "Existe" };
  } else {
    const Query3 = await Marca.create({
      Marca: data.Marca,
      TipoEquipo_id: data.TipoEquipo,
    });
    return { msg: "NoExiste", data: Query3 };
  }
};
export const crearModeloSocket = async (data: any) => {
  const Query0 = await Modelo.findOne({
    where: { Modelo: data.Modelo, Marca_id: data.Marca },
  });
  if (Query0) {
    return { msg: "Existe" };
  } else {
    const Query3 = await Modelo.create({
      Modelo: data.Modelo,
      Marca_id: data.Marca,
    });
    return { msg: "NoExiste", data: Query3 };
  }
};
export const crearEquipoSocket = async (data: any) => {
  const Query0 = await Equipo.findOne({
    where: {
      Cliente_id: data.Cliente,
      Modelo_id: data.Modelo,
      Area_id: data.Area,
    },
  });
  if (Query0) {
    return { msg: "Existe" };
  } else {
    const Query3 = await Equipo.create({
      Cliente_id: data.Cliente,
      Modelo_id: data.Modelo,
      Area_id: data.Area,
      Especificacion: data.Especificacion,
      Gamma: data.Gamma,
    });

    return { msg: "NoExiste", data: Query3 };
  }
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
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Modelo.Marca.Marca",
      "Modelo.Modelo",
      "Cliente.CodCliente",
      "Especificacion",
      "Gamma",
      "Estado_id",
    ],
    include: [
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
    where: {
      Estado_id: "1",
    },
  });

  return Query3;
};
export const listarEquipoxClxTCSocket = async (data: any) => {
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Modelo.Marca.Marca",
      "Modelo.Modelo",
      "Cliente.CodCliente",
      "Especificacion",
      "Gamma",
      "Estado_id",
    ],
    include: [
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
                where: { IdTipoEquipo: data.TipoEquipo },
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
    where: {
      Estado_id: "1",
      Cliente_id: data.Cliente,
    },
  });

  return Query3;
};

export const listarEquipoDescuentoSocket = async () => {
  EquipoDescuento.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoDescuento.findAll({
    raw: true,
    attributes: [
      "IdEquipoDescuento",
      "Equipo.Modelo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Equipo.Cliente.CodCliente",
      "Tiempo",
      "Precio",
      "Estado_id",
    ],
    include: [
      {
        model: Equipo,
        attributes: [],
        required: true,
        include: [
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
                  { model: TipoEquipo, attributes: [], required: true },
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
      },
    ],
    where: {
      Estado_id: "1",
    },
  });

  return Query3;
};

export const listarMarcaxTipoEquipo = async () => {
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      [Sequelize.literal("DISTINCT Modelo.Marca.IdMarca"), "IdMarca"],
      "Modelo.Marca.Marca",
      "Modelo.Marca.TipoEquipo.TipoEquipo",
      "Modelo.Marca.Estado",
    ],
    include: [
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
                  TipoEquipo: "Celular",
                },
              },
            ],
          },
        ],
      },
    ],
    where: {
      Estado_id: "1",
      Cliente_id: "1",
    },
  });

  return Query3;
};

export const listarModeloxMarca = async () => {
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      [Sequelize.literal("DISTINCT Modelo.Marca.IdMarca"), "IdMarca"],
      "Modelo.Marca.Marca",
      "Modelo.Marca.TipoEquipo.TipoEquipo",
      "Modelo.Marca.Estado",
    ],
    include: [
      {
        model: Modelo,
        attributes: [],
        required: true,
        include: [{ model: Marca, attributes: [], required: true }],
      },
    ],
    where: {
      Estado_id: "1",
    },
  });

  return Query3;
};

export const listarMarcaXTipoEquipo = async (data: any) => {
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query3 = await Marca.findAll({
    raw: true,
    attributes: [
      "IdMarca",
      "TipoEquipo.Clasificacion",
      "TipoEquipo.TipoEquipo",
      "Marca",
      "Estado_id",
    ],
    include: [
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado_id: "1",
      TipoEquipo_id: data.TipoEquipo,
    },
  });

  return Query3;
};

export const listarModeloXMarca = async (data: any) => {
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });

  const Query3 = await Modelo.findAll({
    raw: true,
    attributes: ["IdModelo", "Modelo", "Estado_id"],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado_id: "1",
      Marca_id: data.Marca,
    },
  });

  return Query3;
};
export const listarEquipoXAreaXClienteXTipoEquipo = async (data: any) => {
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: ["IdEquipo", "Modelo.Marca.Marca", "Modelo.Modelo", "Estado_id"],
    include: [
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
                where: { IdTipoEquipo: data.TipoEquipo },
              },
            ],
          },
        ],
      },
    ],
    where: {
      Estado_id: "1",
      Cliente_id: data.Cliente,
      Area_id: data.Area,
    },
  });

  return Query3;
};
