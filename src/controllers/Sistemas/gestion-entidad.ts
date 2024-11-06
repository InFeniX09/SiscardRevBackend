import { Op } from "sequelize";
import Cliente from "../../models/cliente";
import Entidad from "../../models/entidad";
import TipoDocumento from "../../models/tipodocumento";
import Usuario from "../../models/usuario";
import Perfil from "../../models/perfil";
import PerfilUsuario from "../../models/perfilusuario";

export const listarClienteSocket = async () => {
  const Query3 = await Cliente.findAll({
    raw: true,
    attributes: ["IdCliente", "CodCliente", "Estado_id"],
    where: {
      Estado_id: "1",
    },
  });

  return Query3;
};



export const listarUsuarioPerfilSocket = async () => {
  //las declaraciones
  PerfilUsuario.belongsTo(Usuario, { foreignKey: "Usuario_id"})
  PerfilUsuario.belongsTo(Perfil, { foreignKey: "Perfil_id"})

  const Query3 = await PerfilUsuario.findAll({
    attributes: ["IdPerfilUsuario"],
    include: [
      {
        model: Usuario,
        attributes: ["Usuario"],
        required: true
      },
      {
        model: Perfil,
        attributes: ["Perfil"],
        required: true

      }

    ],
    where: {
      Estado_id: "1",
    },
  });

  console.log(Query3);

  const resultado = Query3.map(item => ({
    IdPerfilUsuario: item.dataValues['IdPerfilUsuario'],
    Usuario: item.dataValues['Usuario'].dataValues['Usuario'],
    Perfil: item.dataValues['Perfil'].dataValues['Perfil']
  }));

  console.log("RESULTADOS: ", resultado)

  return resultado;
};

export const  listarPerfilSocket = async () => {
  const Query3 = await Perfil.findAll({
    raw: true,
    attributes: ["IdPerfil", "Perfil", "Estado_id"],
    where: {
      Estado_id: "1",
    },
  });



  return Query3;
};


export const crearUsuario = async (data: any) => {
  const Query0 = await Usuario.findOne({
    where: {
      Usuario: data.Usuario,
    },
  });
  if (Query0) {
    return { msg: "Existe" };
  } else {
    const Query3 = await Usuario.create({
      Usuario: data.Usuario,
      Clave: data.Clave,
      Entidad_id: data.Entidad,
    });
    return { msg: "NoExiste", data: Query3 };
  }
};
