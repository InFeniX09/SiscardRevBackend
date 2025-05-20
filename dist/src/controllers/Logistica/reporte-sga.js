"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descargarReporteSGA = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const VW_CONSULTA379_Test_1 = __importDefault(require("../../models/DWH/views/VW_CONSULTA379_Test"));
const descargarReporteSGA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Realiza la consulta a la base de datos con Sequelize
        const resultados = yield VW_CONSULTA379_Test_1.default.findAll({
        // Puedes agregar filtros si es necesario
        });
        // 2. Crea un nuevo workbook (libro de Excel)
        const workbook = new exceljs_1.default.Workbook();
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
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        console.error('Error al exportar a Excel:', error);
        res.status(500).send('Error al exportar a Excel');
    }
});
exports.descargarReporteSGA = descargarReporteSGA;
