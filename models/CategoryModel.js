import { Model, DataTypes } from 'sequelize'


export default class Category extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
            {
                sequelize,
                modelName: 'category'
            })
    }
}