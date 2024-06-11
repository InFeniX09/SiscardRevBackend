import { Op } from "sequelize";
import Cliente from "../../models/cliente";
import Entidad from "../../models/entidad";
import TipoDocumento from "../../models/tipodocumento";
import Usuario from "../../models/usuario";

export const listarClienteSocket = async () => {
  const Query3 = await Cliente.findAll({
    raw: true,
    attributes: ["IdCliente", "CodCliente", "DescripcionCliente", "Estado_id"],
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
