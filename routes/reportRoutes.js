import { Router } from 'express';
import ReportController from '../controllers/ReportController.js';
import { validSession } from '../middleware/SessionService.js';
const reportRoutes = Router();


reportRoutes.get('/', ReportController.showReport);
reportRoutes.get('/pdf', validSession, ReportController.makePdf);

export default reportRoutes;