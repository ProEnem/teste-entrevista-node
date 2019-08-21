import { Sequelize } from 'sequelize-typescript'
import config from '../config/Config'
export default class ConnectionDatabase {
  public static async connect (): Promise<void> {
    const sequelize = new Sequelize({
      database: config.development.mysqlDatabase,
      username: config.development.mysqlUser,
      password: config.development.rootPassword,
      host: config.development.host,
      port: +config.development.port,
      dialect: 'mysql'
    })
    try {
      await sequelize.authenticate()
    } catch (error) {
      console.error(error)
    }
  }
}
