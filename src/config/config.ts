const config = {
  development: {
    dialect: process.env.dialect || 'mysql',
    rootPassword: process.env.rootPassword || 'lollerskates',
    mysqlDatabase: process.env.database || 'sequelize_test',
    mysqlUser: process.env.mysqlUser || 'sequelize_test',
    mysqlPassword: process.env.mysqlPassword || 'sequelize_test',
    host: process.env.host || 'mysql-57'
  }
}

export default config
