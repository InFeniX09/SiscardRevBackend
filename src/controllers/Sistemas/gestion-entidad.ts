import { Op } from "sequelize";
import Cliente from "../../models/cliente";
import Entidad from "../../models/entidad";
import TipoDocumento from "../../models/tipodocumento";
import Usuario from "../../models/usuario";

export const listarClienteSocket = async () => {
  const Query3 = await Cliente.findAll({
    raw: true,
    attributes: ["IdCliente", "CodCliente", "DescripcionCliente", "Estado"],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};

export const crearUsuario = async (data: any) => {
  const Query0 = await Usuario.findOne({
    where: { [Op.or]: [
      { Usuario: data.Usuario },
      { Correo: data.CorreoEmpresarial }
    ] },
  });
  if (Query0) {
    return { msg: "Existe" };
  } else {
    const Query2: any = await Entidad.create({
      Nombres: data.Nombres,
      Apellidos: data.Apellidos,
      TipoDocumento_id: data.TipoDocumento,
      NroDocumento: data.NroDocumento,
      Correo: data.Correo,
      Telefono: data.Telefono,
      Direccion: data.Direccion,
      Genero: data.Genero,
      FcNacimiento: data.Fecha,
      FcIngreso: data.FechaIngreso,
      Area_id: data.Area,
      Puesto_id: data.Puesto,
      TipoEntidad_id: 1,
    });
    const Query3 = await Usuario.create({
      Usuario: data.Usuario,
      Clave: data.Clave,
      Correo: data.CorreoEmpresarial,
      Entidad_id: Query2.IdEntidad,
    });
    return { msg: "NoExiste", data: Query3 };
  }
};
