import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import { validSession } from "../middleware/SessionService.js";

const productRoutes = Router();


productRoutes.get('/add', validSession, ProductController.showRegisterProduct);
productRoutes.post('/add', validSession, ProductController.saveProduct);
productRoutes.get('/search', validSession, ProductController.getProduct);
productRoutes.get('/search/API', validSession, ProductController.getProductAPI);
productRoutes.get('/search/input', validSession, ProductController.getProductOplike);
productRoutes.get('/chart', validSession, ProductController.showChart);
productRoutes.get('/chart/API', validSession, ProductController.getProductQtd);


export default productRoutes;