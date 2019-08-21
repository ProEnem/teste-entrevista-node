import { Model, DataTypes } from 'sequelize'
import ConnectionDatabase from '../database/ConnectionDatabase'

import bcrypt from 'bcryptjs'
const sequelize = ConnectionDatabase.instance()

export class Evaluation extends Model {
  public id!: number;

  public firstEvaluation!: number

  public secondEvaluation!: number

  public userId!: number
}

Evaluation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  firstEvaluation: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  secondEvaluation: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'evaluation',
  sequelize: sequelize
})

export default class Student extends Model {
  public id!: number;

  public name!: string

  public email!: string

  public password!: string
}

Student.init({
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
  tableName: 'student',
  sequelize: sequelize
})

Student.beforeCreate(async user => {
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})

Student.hasMany(Evaluation, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'evaluation'
})

sequelize.sync({ force: true }).then()
