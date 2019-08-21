import { Model, DataTypes } from 'sequelize'
import ConnectionDatabase from '../database/ConnectionDatabase'
import bcrypt from 'bcryptjs'
import TestGrade from './TestGrade'

const sequelize = ConnectionDatabase.instance()

export default class User extends Model {
  public id!: number;

  public name!: string

  public email!: string

  public password!: string
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
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'user',
  sequelize: sequelize
})

User.beforeCreate(async user => {
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})

User.hasMany(TestGrade, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'test_grades'
})

sequelize.sync({ force: true }).then()
