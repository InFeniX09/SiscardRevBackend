import { Sequelize } from "sequelize";
import Menu from "../../models/menu";
import MenuAsignado from "../../models/menuasignado";
import Perfil from "../../models/perfil";
import PerfilUsuario from "../../models/perfilusuario";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";

export const listarTablaMenuAsignado = async () => {
  MenuAsignado.belongsTo(Menu, { foreignKey: "Menu_id" });
  MenuAsignado.belongsTo(Usuario, { foreignKey: "Usuario_id" });
  MenuAsignado.belongsTo(PerfilUsuario, { foreignKey: "PerfilUsuario_id" });
  PerfilUsuario.belongsTo(Perfil, { foreignKey: "Perfil_id" });

  const results = await MenuAsignado.findAll({
    raw: true,
    attributes: [
      "MenuAsignado.IdMenuAsignado",
      [Sequelize.literal("COALESCE(Menu.Menu, '')"), "Menu"],
      [Sequelize.literal("COALESCE(Usuario.Usuario, '')"), "Usuario"],
      [
        Sequelize.literal("COALESCE([PerfilUsuario->Perfil].Perfil, '')"),
        "Perfil",
      ],

      "MenuAsignado.Estado_id",
    ],
    include: [
      {
        model: Menu,
        attributes: [],
        required: true,
      },
      {
        model: Usuario,
        attributes: [],
        required: false,
      },
      {
        model: PerfilUsuario,
        attributes: [],
        required: false,
        include: [{ model: Perfil, attributes: [], required: false }],
      },
    ],
    where: {},
  });
  return results;
};
export const listarEmpleadoSinUsuario = async () => {
  Entidad.hasMany(Usuario, { foreignKey: "Entidad_id" });

  const results = await Entidad.findAll({
    raw: true,
    attributes: ["Entidad.IdEntidad", "Entidad.Nombres", "Entidad.Apellidos","Usuarios.Entidad_id"],
    include: [
      {
        model: Usuario,
        attributes: [],
        required: false,
        
      },
    ],
    where: { '$Usuarios.Entidad_id$': null },
  });

  return results;
};
