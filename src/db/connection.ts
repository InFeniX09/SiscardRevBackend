import { Sequelize } from "sequelize";

export const db: Sequelize[] = [];

const SiscardRevolution = new Sequelize(
  "SiscardRevolutionTest",
  "sa",
  "S1sc4rd#01",
  {
    dialect: "mssql",
    host: "172.17.7.39",
    port: 1433,
    dialectOptions: {
     
    },
  }
);

db.push(SiscardRevolution);

export default SiscardRevolution;

export const connect = async () => {
  // De la base Halcon se consultan los autorizadores
  try {
    await SiscardRevolution.authenticate();
    console.log("Base de datos SiscardRevolution online");
  } catch (error) {
    console.log("Base de datos SiscardRevolution offline");
    throw error;
  }
};
