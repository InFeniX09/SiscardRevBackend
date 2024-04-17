import TipoMotivo from "../../models/tipomotivo";
import Marca from "../../models/marca";
import TipoEquipo from "../../models/tipoequipo";
import EquipoStock from "../../models/equipostock";
import Usuario from "../../models/usuario";
import Equipo from "../../models/equipo";
import Modelo from "../../models/modelo";
import Cliente from "../../models/cliente";
import EquipoControl from "../../models/equipocontrol";

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
