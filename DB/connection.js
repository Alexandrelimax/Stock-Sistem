import User from '../models/UserModel.js';
import Category from '../models/CategoryModel.js';
import Login from '../models/LoginModel.js';
import Product from '../models/ProductModel.js';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Supplier from '../models/SupplierModel.js';
dotenv.config();


const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host:process.env.HOST,
        dialect:process.env.DIALECT,
    }
    ,
    

)
const models = [User, Login, Category, Product, Supplier];

models.forEach(model => model.init(sequelize));

Product.belongsToMany(Category, { through: 'product_category' })
Category.belongsToMany(Product, { through: 'product_category' })

Product.belongsToMany(Supplier, { through: 'product_supplier' })
Supplier.belongsToMany(Product, { through: 'product_supplier' })

Login.belongsTo(User, {foreignKey: 'email', targetKey:'email'});


try {
    sequelize.authenticate();
    console.log('conectado!');

} catch (error) {
    console.log("erro" + error);
}



export default sequelize;