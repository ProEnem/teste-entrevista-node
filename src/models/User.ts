import { Model, DataTypes } from 'sequelize'
import ConnectionDatabase from '../database/ConnectionDatabase'
const sequelize = ConnectionDatabase.instance()

export default class User extends Model {
  public id!: number;

  public name!: string

  public email!: string
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: true
  }
}, {
  tableName: 'user',
  sequelize: sequelize
})
