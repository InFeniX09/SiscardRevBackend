import TipoMotivo from "../../models/tipomotivo";
import Marca from "../../models/marca";
import TipoEquipo from "../../models/tipoequipo";
import EquipoStock from "../../models/equipostock";
import Usuario from "../../models/usuario";
import Equipo from "../../models/equipo";
import Modelo from "../../models/modelo";
import Cliente from "../../models/cliente";
import EquipoControl from "../../models/equipocontrol";
import EquipoSerie from "../../models/equiposerie";
import moment from "moment-timezone";
import Estado from "../../models/estado";

export const listarEquipoStockSocket = async () => {
  EquipoStock.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  EquipoStock.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoStock.findAll({
    raw: true,
    attributes: [
      "IdEquipoStock",
      "Equipo.Cliente.CodCliente",
      "Equipo.Marca.Marca",
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
    where: {},
  });

  return Query3;
};

export const listarEquipoControlSocket = async () => {
  EquipoControl.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  EquipoControl.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoControl.findAll({
    raw: true,
    attributes: [
      "IdEquipoControl",
      "Equipo.Cliente.CodCliente",
      "Equipo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Usuario.Usuario",
      "Serie",
      "Identificacion",
      "TiempoVida",
      "FcAsignado",
      "FcBaja",
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
    where: {},
  });

  return Query3;
};

export const listarEquipoSerieSocket = async () => {
  EquipoSerie.belongsTo(Equipo, { foreignKey: "Equipo_id" });
  EquipoSerie.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await EquipoSerie.findAll({
    raw: true,
    attributes: [
      "IdEquipoSerie",
      "Equipo.Cliente.CodCliente",
      "Equipo.Marca.Marca",
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
    where: {},
  });

  return Query3;
};

export const cargaMasivaEquipoSocket = async (data: any) => {
  try {
    // Recopila todos los nombres de marca y modelo únicos
    const marcasUnicas: any[] = [
      ...new Set(data.map((item: any) => item.Marca)),
    ];
    const modelosUnicos: any[] = [
      ...new Set(data.map((item: any) => item.Modelo)),
    ];
    const estadosUnicos: any[] = [
      ...new Set(data.map((item: any) => item.Estado)),
    ];

    // Obtiene los IDs de Marca y Modelo
    const [marcas, modelos,estados] = await Promise.all([
      obtenerIdsMarca(marcasUnicas),
      obtenerIdsModelo(modelosUnicos),
      obtenerEstados(estadosUnicos),
    ]);

    // Crea un mapa para facilitar la búsqueda
    const marcaMap = new Map(
      marcas.map((marca: any) => [marca.Marca, marca.IdMarca])
    );
    const modeloMap = new Map(
      modelos.map((modelo: any) => [modelo.Modelo, modelo.IdModelo])
    );
    const estadoMap = new Map(
      estados.map((estado: any) => [estado.Estado, estado.IdEstado])
    );

    // Obtiene los IDs de los equipos
    const equipos = await obtenerIdsEquipo();
    console.log("RAP1", equipos);

    // Crea un mapa para facilitar la búsqueda
    const equipoMap = new Map(
      equipos.map((equipo: any) => [
        `${equipo.Marca_id}-${equipo.Modelo_id}`,
        equipo.IdEquipo,
      ])
    );

    console.log("RAP", equipoMap);
    // Recorre los datos y crea el nuevo JSON
    const equiposSerieJSON = data.map((item: any) => {
      const today =
        moment(item.FcIngreso).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
      const marcaId = marcaMap.get(item.Marca);
      const modeloId = modeloMap.get(item.Modelo);
      const estados = estadoMap.get(item.Estado);

      const equipoId = equipoMap.get(`${marcaId}-${modeloId}`);
      console.log("RAPa", equipoId);
      return {
        Serie: item.Imei,
        FcIngreso: today,
        Estado: estados,
        Equipo_id: equipoId,
        
      };
    });

    // Inserta los datos masivamente usando Sequelize
    await EquipoSerie.bulkCreate(equiposSerieJSON);

    console.log("Carga masiva completada con éxito");
  } catch (error) {
    console.error("Error en la carga masiva:", error);
  }
};

const obtenerIdsEquipo = async () => {
  try {
    const equipos = await Equipo.findAll({
      raw: true,
      attributes: ["IdEquipo", "Marca_id", "Modelo_id"],
    });

    console.log("snow", equipos);

    return equipos.map((equipo: any) => ({
      Marca_id: equipo.Marca_id,
      Modelo_id: equipo.Modelo_id,
      IdEquipo: equipo.IdEquipo,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de los equipos:", error);
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
      where: { Agrupamiento: "Equipo" },
    });
    return estadosEnDB.map((estado: any) => ({
      Estado: estado.Estado,
      IdEstado: estado.IdEstado,
    }));
  } catch (error) {
    console.error("Error al obtener los IDs de los modelos:", error);
    return [];
  }
};
