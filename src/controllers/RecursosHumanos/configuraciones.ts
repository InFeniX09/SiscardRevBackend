import Departamento from "../../models/departamento";
import Distrito from "../../models/distrito";
import Empleado from "../../models/empleado";
import Entidad from "../../models/entidad";
import Provincia from "../../models/provincia";

export const listarTablaEmpleado = async () => {
  Entidad.belongsTo(Empleado, { foreignKey: "EntidadRelacion_id" });

  const results = await Entidad.findAll({
    raw: true,
    attributes: ["Empleado.IdEmpleado", "Empleado.Correo", "Empleado.Telefono"],
    include: [
      {
        model: Empleado,
        attributes: [],
        required: true,
      },
    ],
    where: {},
  });
  return results;
};
export const crearEmpleado = async (data: any) => {
  const Query0 = await Empleado.findOne({
    where: {
      Correo: data.CorreoCorporativo,
    },
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
      Ubigeo:data.Ubigeo,
      Direccion: data.Direccion,
      EntidadRelacion_id:data.EntidadRelacion,
      Genero: data.Genero,
      FcNacimiento: data.Fecha,
      FcIngreso: data.FechaIngreso,  
      TipoEntidad_id: 1,
    });
    const Query3 = await Empleado.create({
      Area_id: data.Area,
      Puesto_id: data.Puesto,
      Correo: data.CorreoCorporativo,
    });
    return { msg: "NoExiste", data: Query3 };
  }
};

export const listarDepartamento = async () => {
  const results = await Departamento.findAll({
    raw: true,
    attributes: ["IdDepartamento", "Departamento"],
    where: {},
  });
  return results;
};
export const listarProvinciaXDepartamento = async (data: any) => {
  const results = await Provincia.findAll({
    raw: true,
    attributes: ["IdProvincia", "Provincia"],
    where: {
      Departamento_id: data.Departamento,
    },
  });
  return results;
};
export const listarDistritoXProvinciaXDepartamento = async (data: any) => {
  const results = await Distrito.findAll({
    raw: true,
    attributes: ["IdDistrito", "Distrito"],
    where: {
      Provincia_id: data.Provincia,
    },
  });
  return results;
};
