import { DataTypes, Model } from "sequelize";

export default class Supplier extends Model{
    static init(sequelize){
        super.init({
            name:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'supplier'
        })
    }
}