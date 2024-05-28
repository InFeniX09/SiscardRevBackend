import Marca from "../../models/marca";
import EquipoStock from "../../models/equipostock";
import Usuario from "../../models/usuario";
import Equipo from "../../models/equipo";
import Modelo from "../../models/modelo";
import Cliente from "../../models/cliente";
import EquipoControl from "../../models/equipocontrol";
import EquipoSerie from "../../models/equiposerie";
import moment from "moment-timezone";
import Estado from "../../models/estado";
import Area from "../../models/area";

export const listarEquipoStockSocket = async () => {
  EquipoStock.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  EquipoStock.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoStock.findAll({
    raw: true,
    attributes: [
      "IdEquipoStock",
      "Equipo.Cliente.CodCliente",
      "Equipo.Modelo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Usuario.Usuario",
      "StockActual",
      "StockDisponible",
      "StockNoDisponible",
    ],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: true,
      },
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
    where: {},
  });

  return Query3;
};

export const listarEquipoControlSocket = async () => {
  EquipoControl.belongsTo(EquipoSerie, { foreignKey: "EquipoSerie_id" });
  EquipoControl.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  EquipoSerie.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoControl.findAll({
    raw: true,
    attributes: [
      "IdEquipoControl",
      "EquipoSerie.Equipo.Cliente.CodCliente",
      "EquipoSerie.Equipo.Modelo.Marca.Marca",
      "EquipoSerie.Equipo.Modelo.Modelo",
      "Usuario.Usuario",
      "FcMovimiento",
      "Observacion",
      "Estado",
    ],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: true,
      },
      {
        model: EquipoSerie,
        attributes: [],
        required: true,
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
      },
    ],
    where: {},
  });

  return Query3;
};

export const listarEquipoSerieSocket = async () => {
  EquipoSerie.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  EquipoSerie.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoSerie.findAll({
    raw: true,
    attributes: [
      "IdEquipoSerie",
      "Equipo.Cliente.CodCliente",
      "Equipo.Modelo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Usuario.Usuario",
      "Serie",
      "Estado",
    ],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: true,
      },
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
    where: {},
  });

  return Query3;
};

export const cargaMasivaEquipoSocket = async (data: any) => {
  try {
    // Recopila todos los nombres de marca,modelo,estado
    const clientesUnicos: any[] = [
      ...new Set(data.map((item: any) => item.CodCliente)),
    ];
    const marcasUnicas: any[] = [
      ...new Set(data.map((item: any) => item.Marca)),
    ];
    const modelosUnicos: any[] = [
      ...new Set(data.map((item: any) => item.Modelo)),
    ];
    const areasUnicas: any[] = [...new Set(data.map((item: any) => item.Area))];
    const estadosUnicos: any[] = [
      ...new Set(data.map((item: any) => item.Estado)),
    ];
    // Obtiene los IDs de Marca y Modelo
    const [clientes, marcas, modelos, areas, estados] = await Promise.all([
      obtenerIdsCliente(clientesUnicos),
      obtenerIdsMarca(marcasUnicas),
      obtenerIdsModelo(modelosUnicos),
      obtenerIdsArea(areasUnicas),
      obtenerEstados(estadosUnicos),
    ]);
    // Crea un mapa para facilitar la búsqueda
    const clienteMap = new Map(
      clientes.map((cliente: any) => [cliente.CodCliente, cliente.IdCliente])
    );
    const marcaMap = new Map(
      marcas.map((marca: any) => [marca.Marca, marca.IdMarca])
    );
    const modeloMap = new Map(
      modelos.map((modelo: any) => [modelo.Modelo, modelo.IdModelo])
    );
    const areaMap = new Map(areas.map((area: any) => [area.Area, area.IdArea]));
    const estadoMap = new Map(
      estados.map((estado: any) => [estado.Estado, estado.IdEstado])
    );
    // Obtiene los IDs de los equipos
    const equipos = await obtenerIdsEquipo();
    // Crea un mapa para facilitar la búsqueda
    const equipoMap = new Map(
      equipos.map((equipo: any) => [
        `${equipo.Cliente_id}-${equipo.Marca_id}-${equipo.Modelo_id}-${equipo.Area_id}`,
        equipo.IdEquipo,
      ])
    );
    // Recorre los datos y crea el nuevo JSON
    const equiposSerieJSON = data.map((item: any) => {
      const today =
        moment(item.FcIngreso).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
      const clienteId = clienteMap.get(item.CodCliente);
      const marcaId = marcaMap.get(item.Marca);
      const modeloId = modeloMap.get(item.Modelo);
      const areaId = areaMap.get(item.Area);
      const estados = estadoMap.get(item.Estado);
      const equipoId = equipoMap.get(
        `${clienteId}-${marcaId}-${modeloId}-${areaId}`
      );
      return {
        Equipo_id: equipoId,
        Serie: item.Serie,
        Identificador: item.Identificador,
        Usuario_id: 5,
        FcIngreso: today,
        Estado: estados,
      };
    });
    //Final (Ingreso SERIES)
    const insercionmasiva = await EquipoSerie.bulkCreate(equiposSerieJSON);
    const equiposSerieJSON1 = insercionmasiva.map((item: any) => {
      return {
        EquipoSerie_id: item.IdEquipoSerie,
        Usuario_id: 5,
        Observacion: "Ingreso de Stock por Software",
      };
    });
    //Final (Ingreso Control)
    const insercionmasiva1: any = await EquipoControl.bulkCreate(
      equiposSerieJSON1
    );
    console.log("infe", equiposSerieJSON);

    const stockPorEquipoId: { [key: number]: number } = {};

    // Iteramos sobre el array equiposSerieJSON para contar la cantidad de elementos por Equipo_id
    equiposSerieJSON.forEach((item: { Equipo_id: number }) => {
      const { Equipo_id } = item;
      if (stockPorEquipoId[Equipo_id]) {
        stockPorEquipoId[Equipo_id] += 1; // Puedes sumar la cantidad que desees aquí
      } else {
        stockPorEquipoId[Equipo_id] = 1; // Puedes inicializar la cantidad con el valor que desees aquí
      }
    });
    const nuevoArray = Object.entries(stockPorEquipoId).map(
      ([Equipo_id, cantidad]) => ({ Equipo_id: parseInt(Equipo_id), cantidad })
    );

    // Ahora nuevoArray contiene la cantidad de stock por Equipo_id
    console.log("carnal", nuevoArray);

    nuevoArray.forEach(async (element: any) => {
      const stockActual: any = await EquipoStock.findOne({
        where: { Equipo_id: element.Equipo_id, Usuario_id: 5 },
      });

      if (!stockActual) {
        await EquipoStock.create({
          StockDisponible: element.cantidad,
          StockNoDisponible: 0,
          Equipo_id: element.Equipo_id,
          Usuario_id: 5,
        });
      } else {
        await EquipoStock.update(
          {
            StockDisponible: stockActual.StockDisponible + element.cantidad,
          },
          {
            where: { Equipo_id: element.Equipo_id, Usuario_id: 5 },
          }
        );
      }
    });
  } catch (error) {
    console.error("Error en la carga masiva:", error);
  }
};

const obtenerIdsEquipo = async () => {
  try {
    const equipos = await Equipo.findAll({
      raw: true,
      attributes: ["IdEquipo", "Cliente_id", "Modelo_id", "Area_id"],
    });

    console.log("snow", equipos);

    return equipos.map((equipo: any) => ({
      Cliente_id: equipo.Cliente_id,
      Area_id: equipo.Area_id,
      Modelo_id: equipo.Modelo_id,
      IdEquipo: equipo.IdEquipo,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de los equipos:", error);
    return [];
  }
};
const obtenerIdsCliente = async (clientes: string[]) => {
  try {
    const marcasEnDB = await Cliente.findAll({
      where: { CodCliente: clientes },
    });
    return marcasEnDB.map((cliente: any) => ({
      CodCliente: cliente.CodCliente,
      IdCliente: cliente.IdCliente,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de las marcas:", error);
    return [];
  }
};
const obtenerIdsMarca = async (marcas: string[]) => {
  try {
    const marcasEnDB = await Marca.findAll({ where: { Marca: marcas } });
    return marcasEnDB.map((marca: any) => ({
      Marca: marca.Marca,
      IdMarca: marca.IdMarca,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de las marcas:", error);
    return [];
  }
};
const obtenerIdsModelo = async (modelos: string[]) => {
  try {
    const modelosEnDB = await Modelo.findAll({ where: { Modelo: modelos } });
    return modelosEnDB.map((modelo: any) => ({
      Modelo: modelo.Modelo,
      IdModelo: modelo.IdModelo,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de los modelos:", error);
    return [];
  }
};
const obtenerEstados = async (estados: string[]) => {
  try {
    const estadosEnDB = await Estado.findAll({
      where: { Agrupamiento: "Equipo", Estado: estados },
    });
    return estadosEnDB.map((estado: any) => ({
      Estado: estado.Estado,
      IdEstado: estado.IdEstado,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de los estados:", error);
    return [];
  }
};
const obtenerIdsArea = async (areas: string[]) => {
  try {
    const modelosEnDB = await Area.findAll({ where: { Area: areas } });
    return modelosEnDB.map((area: any) => ({
      Area: area.Area,
      IdArea: area.IdArea,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de los modelos:", error);
    return [];
  }
};

export const listarEquipoxClasificacionSocket = async () => {
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
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
        model: Modelo,
        attributes: [],
        required: true,
        include: [
          {
            model: Marca,
            attributes: [],
            required: true,
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

  return Query3;
};
