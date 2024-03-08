import { Sequelize } from "sequelize";

export const db: Sequelize[] = [];

const SiscardForge= new Sequelize('SiscardRevolution','sae','Siscard2024$',{
    dialect:'mssql',
    host:'localhost',
    timezone: '',
    port:1433,
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
})

db.push(SiscardForge);

export const connect = async () => {
    // De la base Halcon se consultan los autorizadores
    try {
        await SiscardForge.authenticate()
        console.log('Base de datos Halcon online')
    } catch (error) {
        console.log('Base de datos Halcon offline');
        throw error;
    }
}