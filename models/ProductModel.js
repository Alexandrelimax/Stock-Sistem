import { Model, DataTypes } from 'sequelize'

export default class Product extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      datasheet: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
      {
        sequelize,
        modelName: 'product',
      })
  }
}
