import { Model, DataTypes } from 'sequelize'
import ConnectionDatabase from '../database/ConnectionDatabase'
const sequelize = ConnectionDatabase.instance()

export default class TestGrade extends Model {
  public id!: number;

  public firstEvaluation!: number

  public secondEvaluation!: number

  public ownerId!: number
}

TestGrade.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  firstEvaluation: {
    type: new DataTypes.NUMBER(),
    allowNull: false
  },
  secondEvaluation: {
    type: new DataTypes.NUMBER(),
    allowNull: false
  }
}, {
  tableName: 'test_grade',
  sequelize: sequelize
})
