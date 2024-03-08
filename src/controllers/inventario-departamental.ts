import { Request, Response, request, response } from "express";
import { Op, Sequelize } from "sequelize";
import Usuario from "../models/usuario";
import Equipo from "../models/equipo";
import Marca from "../models/marca";
import TipoEquipo from "../models/tipoequipo";
import Modelo from "../models/modelo";
import Cliente from "../models/cliente";
import EquipoStock from "../models/equipostock";
import EquipoControl from "../models/equipocontrol";
import Proveedor from "../models/proveedor";
import EquipoDescuento from "../models/equipodescuento";

//Listo

export const listarMarca = async (req = request, res = response) => {
  const { pIdTipoEquipo } = req.query;

  Marca.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo" });

  const Query3 = await Marca.findAll({
    raw: true,
    attributes: [
      "IdMarca",
      "Marca",
      "TipoEquipo.TipoEquipo",
      "TipoEquipo.Clasificacion",
      "Marca.Estado",
    ],
    include: [
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
        where: {
          IdTipoEquipo: {
            [Op.like]: pIdTipoEquipo
              ? Sequelize.literal(`ISNULL('${pIdTipoEquipo}', '%')`)
              : "%",
          },
        },
      },
    ],
    where: {
      Estado: "A",
    },
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
export const listarModelo = async (req = request, res = response) => {
  const { pIdMarca, pIdTipoEquipo } = req.query;

  Modelo.belongsTo(Marca, { foreignKey: "idMarca" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo" });

  const Query3 = await Modelo.findAll({
    raw: true,
    attributes: [
      "IdModelo",
      "Modelo",
      "Marca.Marca",
      "Marca.TipoEquipo.TipoEquipo",
      "Marca.TipoEquipo.Clasificacion",
      "Modelo.Estado",
    ],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
        where: {
          IdMarca: {
            [Op.like]: pIdMarca
              ? Sequelize.literal(`ISNULL('${pIdMarca}', '%')`)
              : "%",
          },
        },
        include: [
          {
            model: TipoEquipo,
            attributes: [],
            required: true,
            where: {
              IdTipoEquipo: {
                [Op.like]: pIdTipoEquipo
                  ? Sequelize.literal(`ISNULL('${pIdTipoEquipo}', '%')`)
                  : "%",
              },
            },
          },
        ],
      },
    ],
    where: {
      Estado: "A",
    },
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
export const listarTipoEquipo = async (req = request, res = response) => {
  const { pClasificacion } = req.query;

  const Query3 = await TipoEquipo.findAll({
    raw: true,
    attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado"],
    where: {
      Clasificacion: {
        [Op.like]: pClasificacion
          ? Sequelize.literal(`ISNULL('${pClasificacion}', '%')`)
          : "%",
      },
      Estado: "A",
    },
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
export const listarEquipo = async (req = request, res = response) => {
  const { pIdTipoEquipo, pClasificacion } = req.query;

  Equipo.belongsTo(Marca, { foreignKey: "idMarca" });
  Equipo.belongsTo(Modelo, { foreignKey: "idModelo" });
  Equipo.belongsTo(Cliente, { foreignKey: "idCliente" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: [
      "IdEquipo",
      "Cliente.CodCliente",
      "Marca.Marca",
      "Modelo.Modelo",
      "Especificacion",
      "Estado",
    ],
    where: {
      Estado: "A",
    },
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
              IdTipoEquipo: {
                [Op.like]: pIdTipoEquipo
                  ? Sequelize.literal(`ISNULL('${pIdTipoEquipo}', '%')`)
                  : "%",
              },
              Clasificacion: {
                [Op.like]: pClasificacion
                  ? Sequelize.literal(`ISNULL('${pClasificacion}', '%')`)
                  : "%",
              },
            },
          },
        ],
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
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
export const listarEquipoStock = async (req = request, res = response) => {
  const { pUsuario, pClasificacion } = req.query;

  EquipoStock.belongsTo(Usuario, { foreignKey: "idUsuario" });
  EquipoStock.belongsTo(Equipo, { foreignKey: "idEquipo" });
  Equipo.belongsTo(Marca, { foreignKey: "idMarca" });
  Equipo.belongsTo(Modelo, { foreignKey: "idModelo" });
  Equipo.belongsTo(Cliente, { foreignKey: "idCliente" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo" });

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
        required: false,
        where: {
          Usuario: {
            [Op.like]: pUsuario
              ? Sequelize.literal(`ISNULL('${pUsuario}', '%')`)
              : "%",
          },
        },
      },
      {
        model: Equipo,
        attributes: [],
        include: [
          {
            model: Marca,
            attributes: [],
            include: [
              {
                model: TipoEquipo,
                attributes: [],
                required: true,
                where: {
                  Clasificacion: {
                    [Op.like]: pClasificacion
                      ? Sequelize.literal(`ISNULL('${pClasificacion}', '%')`)
                      : "%",
                  },
                },
              },
            ],
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
        required: true,
      },
    ],
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
export const listarEquipoControl = async (req = request, res = response) => {
  EquipoControl.belongsTo(Usuario, { foreignKey: "idUsuario" });
  EquipoControl.belongsTo(Equipo, { foreignKey: "idEquipo" });
  EquipoControl.belongsTo(Proveedor, { foreignKey: "idProveedor" });
  Equipo.belongsTo(Marca, { foreignKey: "idMarca" });
  Equipo.belongsTo(Modelo, { foreignKey: "idModelo" });
  Equipo.belongsTo(Cliente, { foreignKey: "idCliente" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo" });

  const Query3 = await EquipoControl.findAll({
    raw: true,
    attributes: [
      "IdEquipoControl",
      "Equipo.Cliente.CodCliente",
      "Equipo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Serie",
      "Identificacion",
      "TiempoVida",
      "Proveedor.Proveedor",
      "FcIngreso",
      "Usuario.Usuario",
      "FcAsignado",
      "FcBaja",
      "Estado",
    ],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: false,
      },
      {
        model: Equipo,
        attributes: [],
        include: [
          {
            model: Marca,
            attributes: [],
            include: [
              {
                model: TipoEquipo,
                attributes: [],
                required: true,
                where: {},
              },
            ],
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
        required: true,
      },
      {
        model: Proveedor,
        attributes: [],
        required: true,
      },
    ],
    where: {},
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
export const listarEquipoDescuento = async (req = request, res = response) => {
  EquipoDescuento.belongsTo(Equipo, { foreignKey: "idEquipo" });
  Equipo.belongsTo(Marca, { foreignKey: "idMarca" });
  Equipo.belongsTo(Modelo, { foreignKey: "idModelo" });
  Marca.belongsTo(TipoEquipo, { foreignKey: "idTipoEquipo" });

  const Query3 = await EquipoDescuento.findAll({
    raw: true,
    attributes: [
      "IdEquipoDescuento",
      "Equipo.Marca.Marca",
      "Equipo.Modelo.Modelo",
      "Precio",
      "Tiempo",
      "Estado",
    ],
    include: [
      {
        model: Equipo,
        attributes: [],
        include: [
          {
            model: Marca,
            attributes: [],
            include: [
              {
                model: TipoEquipo,
                attributes: [],
                required: true,
                where: {},
              },
            ],
            required: true,
          },
          {
            model: Modelo,
            attributes: [],
            required: true,
          },
        ],
        required: true,
      },
    ],
    where: {
      Estado: "A",
    },
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
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
