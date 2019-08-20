const config = {
  development: {
    dialect: process.env.dialect || 'mysql',
    rootPassword: process.env.rootPassword || 'sequelize_test',
    mysqlDatabase: process.env.database || 'sequelize_test',
    mysqlUser: process.env.mysqlUser || 'sequelize_test',
    host: process.env.host || 'mysql-57',
    port: process.env.port || 3306
  }
}

export default config
