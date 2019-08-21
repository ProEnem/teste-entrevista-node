const config = {
  development: {
    dialect: process.env.dialect || 'mysql',
    rootPassword: process.env.rootPassword || 'sequelize_test',
    mysqlDatabase: process.env.database || 'sequelize_test',
    mysqlUser: process.env.mysqlUser || 'sequelize_test',
    host: process.env.host || 'mysql-57',
    port: process.env.port || 3306,
    secret: process.env.jwtToken || '9e973c0a50f03ec68c6798c83e7f900c911831cc3e913fdd16be5055926b8dd3'
  }
}

export default config
