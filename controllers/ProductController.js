import Category from "../models/CategoryModel.js";
import Product from "../models/ProductModel.js";
import Supplier from "../models/SupplierModel.js";
import { isInputEmpty } from "../utils/validationRegister.js"
import { Op } from 'sequelize'
export default class ProductController {

    static showRegisterProduct(req, res) {
        res.render('product_pages/addProduct')
    }


    static async saveProduct(req, res) {
        const collectionError = []
        isInputEmpty(req.body, collectionError);

        const { name, price, category, supplier, quantity, datasheet } = req.body;


        if(quantity < 1){
            collectionError.push('Você precisa cadastrar ao menos um produto')
        }



        try {
            const product = await Product.findOne({ where: { name } });

            if (collectionError.length > 0) {
                collectionError.forEach((err)=> {
                    req.flash('error', err)
                })
                return res.redirect('/products/add')
            }

            let categoryProduct = await Category.findOne({ where: { name: category } });

            let supplierProduct = await Supplier.findOne({ where: { name: supplier } })

            if (!supplierProduct) {
                supplierProduct = await Supplier.create({ name: supplier })
            }

            if (!categoryProduct) {
                categoryProduct = await Category.create({ name: category });
            }

            if (product) {


                const catAlreadyAssociated = await product.hasCategory(categoryProduct);

                if (!catAlreadyAssociated) {
                    await product.addCategory(categoryProduct)
                }
                const supAlreadyAssociated = await product.hasSupplier(supplierProduct);

                if (!supAlreadyAssociated) {
                    await product.addSupplier(supplierProduct)
                }

                product.quantity += Number(quantity);
                await product.save()

            } else {

                const newProduct = await Product.create({ name, price, quantity, datasheet })

                await newProduct.addCategory(categoryProduct);
                await newProduct.addSupplier(supplierProduct);

            }

            req.flash('success', 'Produto criado com sucesso');
            res.redirect('/products/add')
        } catch (error) {
            console.error(error);
            req.flash('error', 'Ocorreu um erro no servidor')
            res.redirect('/products/add')
        }
    }


    static async getProduct(req, res) {


        try {
            const productsDB = await Product.findAll({ include: [Supplier, Category] });
            const products = productsDB.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                category: product.categories.map(category => category.name),
                supplier: product.suppliers.map(supplier => supplier.name),

            }));


            res.render('search_pages/searchProduct', { products })

        } catch (error) {
            console.error(error);
            req.flash('error', 'Ocorreu um erro no servidor')
            res.redirect('/products/home')
        }

    }
    static async getProductAPI(req, res) {
        try {

            const productsDB = await Product.findAll({ include: [Supplier, Category] });

            const products = productsDB.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                createdAt: product.createdAt,
                category: product.categories.map(category => category.name),
                supplier: product.suppliers.map(supplier => supplier.name),
            }));


            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json('Não foi possivel buscar os dados')
        }
    }


    static async getProductOplike(req, res) {

        try {
            const { search } = req.query;

            const findproduct = await Product.findAll({
                include: [Supplier, Category],
                where: {
                    name: { [Op.like]: `%${search}%` }
                }
            })

            const product = findproduct.map(product => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                category: product.categories.map(category => category.name),
                supplier: product.suppliers.map(supplier => supplier.name),
            }))

            res.json(product)

        } catch (error) {
            console.error(error);
            req.flash('error', 'Ocorreu um erro no servidor')
            res.redirect('/products/search')
        }


    }


    static showChart(req, res) {
        res.render('product_pages/chart')
    }


    static async getProductQtd(req, res) {

        try {

            const productsDB = await Product.findAll({ include: [Supplier, Category] });
            const products = productsDB.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,

            }));


            res.json(products)

        } catch (error) {
            console.error(error);
            req.flash('error', 'Ocorreu um erro no servidor')
            res.redirect('/products/chart')
        }
    }
}