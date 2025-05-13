import { Error } from "sequelize";
import datos_extra from "../../models/datos_extra";
import Departamento from "../../models/departamento";
import Distrito from "../../models/distrito";
import Empleado from "../../models/empleado";
import Entidad from "../../models/entidad";
import Provincia from "../../models/provincia";
import { ExecException } from "child_process";

export const listarTablaEmpleado = async () => {
  Entidad.belongsTo(Empleado, { foreignKey: "EntidadRelacion_id" });
  Entidad.belongsTo(datos_extra, {foreignKey: "NroDocumento", targetKey: 'Dni'});

  const results = await Entidad.findAll({
    raw: true,
    attributes: ["Empleado.IdEmpleado", "Entidad.Nombres","Entidad.Apellidos","Empleado.Correo", "Empleado.Telefono",
      "Entidad.Direccion", "datos_extra.FcEmo", "datos_extra.bPolicial"
    ],
    include: [
      {
        model: Empleado,
        attributes: [],
        required: true,
      },
      {
        model: datos_extra,
        attributes: [],
        required: true,
      }
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
    try{
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

      //SELECT * FROM EMPLEADO Y AGARRAR EL ID
      const QueryTraer = await Empleado.findOne({
        order: [['IdEmpleado', 'DESC']], 
      });
      //ACTUALIZAR LA ENTIDAD
      const QueryAct = await Entidad.update(
        {
          EntidadRelacion_id: QueryTraer?.dataValues.IdEmpleado
        },
        {
          where: {
            NroDocumento: data.NroDocumento
          }
        }
    )  
    console.log("a guardar:::",data)
      const Query4 = await datos_extra.create({
        Dni: data.NroDocumento,
        FcEmo: data.FcEmo,
        bPolicial: data.vPolicial===true ? '1' : '0'
      })

      return { msg:"OK"}
    }catch(e){
      return { msg: "Error", data: e}
    }
    
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
