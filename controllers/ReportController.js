import Category from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js";
import Supplier from "../models/SupplierModel.js";
import { createPdf } from "../utils/pdfMake.js";

export default class ReportController {

    static async showReport(req, res) {

        try {
            const productsDB = await Product.findAll({ include: [Supplier, Category] });
            const list = [];
    
            productsDB.forEach(product => {
                const productName = product.name;
                const productPrice = product.price;
                const productQuantity = product.quantity;
    
                for (let i = 0; i < product.categories.length; i++) {
                    list.push({
                        name: productName,
                        price: productPrice,
                        quantity: productQuantity,
                        category: product.categories[i].name,
                        supplier: product.suppliers[i].name
                    });
                }
            });
    
    
            res.render('report_pages/report', { list })
            
        } catch (error) {
            console.error(error);
            
        }

    }
    static async makePdf(req, res) {

        try {

            const productsDB = await Product.findAll({ include: [Supplier, Category] });
            const list = [];

            productsDB.forEach(product => {
                const productName = product.name;
                const productPrice = product.price;
                const productQuantity = product.quantity;

                for (let i = 0; i < product.categories.length; i++) {
                    list.push({
                        name: productName,
                        price: productPrice,
                        quantity: productQuantity,
                        category: product.categories[i].name,
                        supplier: product.suppliers[i].name
                    });
                }
            });

            const pdf = await createPdf(list)
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
            res.send(pdf);

        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }

    }
}