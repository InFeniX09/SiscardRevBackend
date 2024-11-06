import { Request, Response, request, response } from "express";
import ExcelJS from 'exceljs';
import VW_CONSULTA379_Test from "../../models/DWH/views/VW_CONSULTA379_Test";

export const descargarReporteSGA = async (req: Request, res:Response) => {
    try {
      // 1. Realiza la consulta a la base de datos con Sequelize
      const resultados = await VW_CONSULTA379_Test.findAll({
        // Puedes agregar filtros si es necesario
      });
        
      // 2. Crea un nuevo workbook (libro de Excel)
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Resultados');
  
      // 3. Agrega los encabezados a la hoja de trabajo (worksheet)
      worksheet.columns = [
        { header: 'Almacén', key: 'Almacen', width: 15 },
        { header: 'Cantidad', key: 'Cantidad', width: 10 },
        { header: 'Cliente', key: 'Cliente', width: 20 },
        { header: 'Tipo', key: 'Tipo', width: 10 },
        { header: 'Modelo', key: 'Modelo', width: 15 },
        { header: 'Componente SAP', key: 'Componente_SAP', width: 20 },
        { header: 'Número de Serie', key: 'No_Serie', width: 20 },
        { header: 'Averiado/s', key: 'Averiado/s', width: 15 },
        { header: 'Fecha', key: 'Fecha', width: 20 },
        { header: 'Días en Almacén', key: 'DiasEnAlmacen', width: 10 },
        { header: 'Población', key: 'Poblacion', width: 15 },
        { header: 'Provincia', key: 'Provincia', width: 15 },
      ];
  
      // 4. Agrega los datos a la hoja de trabajo
  
      // 5. Configura el archivo Excel para la descarga
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=reporte_SGA.xlsx');
  
      // 6. Escribe el archivo Excel y envíalo al cliente
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      res.status(500).send('Error al exportar a Excel');
    }
  };