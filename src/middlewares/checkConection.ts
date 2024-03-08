// Importa las dependencias necesarias
import { Request, Response, NextFunction } from 'express';
// import { connect } from '../database/connection';
import { db } from '../db/connection'; // Importa el arreglo de instancias Sequelize


// Define el middleware
const checkDBConnection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verifica la conexión con la base de datos
    const sequelize = db[0]; // Por ejemplo, selecciona la primera instancia
    await sequelize.authenticate(); // Verifica el estado de la conexión
    next(); // Continúa con el siguiente middleware o el controlador del endpoint
  } catch (error) {
    console.log('Error de conexión a la base de datos:', error);
    res.status(500).json({ ok:false, message: 'Error de conexión a la base de datos' });
  }
};

// Exporta el middleware para poder usarlo en otros archivos
export default checkDBConnection;
