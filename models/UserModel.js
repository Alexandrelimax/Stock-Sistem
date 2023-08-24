import { Model, DataTypes } from 'sequelize'

export default class User extends Model {
  static init(sequelize) {
    super.init({
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },

    },
      {
        sequelize,
        modelName: 'user'
      })
  }

}