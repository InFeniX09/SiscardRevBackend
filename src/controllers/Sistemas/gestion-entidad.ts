import Cliente from "../../models/cliente";


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
