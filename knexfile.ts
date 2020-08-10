// Update with your config settings.
// const mdb = require("knex-mariadb");


module.exports = {
  development: {
    client:  'mysql',
    connection: {
      // filename: './src/database/db.sqlite'
      host:'127.0.0.1',
      database: "Arrecadacao",
      user: "root",
      // user: "postgres",
      password: "",
      // password: "123456",
      port:'3306'
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/test.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
