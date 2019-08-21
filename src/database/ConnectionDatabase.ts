import { Sequelize } from 'sequelize'
import config from '../config/Config'
export default class ConnectionDatabase {
  public static instance (): Sequelize {
    const sequelize = new Sequelize({
      database: config.development.mysqlDatabase,
      username: config.development.mysqlUser,
      password: config.development.rootPassword,
      host: config.development.host,
      port: +config.development.port,
      dialect: 'mysql'
    })
    return sequelize
  }

  public static async connect (): Promise<void> {
    const sequelize = ConnectionDatabase.instance()
    try {
      await sequelize.authenticate()
    } catch (error) {
      console.error(error)
    }
  }
}
