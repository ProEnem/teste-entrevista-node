import { Model } from 'sequelize'
export default class User extends Model {
  public id!: number;

  public name!: string

  public email!: string

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}
