import { Sequelize } from "sequelize";

export const db2: Sequelize[] = [];

const DWH= new Sequelize('DWCLARO','sa','S1sc4rd#01',{
    dialect:'mssql',
    host:'172.17.7.39',
    timezone: '',
    port:1433,
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
})

db2.push(DWH);

export default DWH

export const ConnectDWH = async () => {
    // De la base Halcon se consultan los autorizadores
    try {
        await DWH.authenticate()
        console.log('Base de datos DWH online')
    } catch (error) {
        console.log('Base de datos DWH offline');
        throw error;
    }
}