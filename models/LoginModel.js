import { Model, DataTypes } from 'sequelize'


export default class Login extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: DataTypes.STRING(100),
        references: { model: 'users', key: 'email' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
      {
        sequelize,
        modelName: 'login',
        tableName: 'login'
      })
  }
}


