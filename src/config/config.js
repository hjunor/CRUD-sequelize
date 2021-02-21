require("dotenv").config();

module.exports = {
  development: {

  username: 'postgres',
  password: 'senha',
  database: 'post',
  host: 'localhost',
  dialect: "postgres",
  protocol: "postgres",
  port: 5432,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    protocol: "postgres",
    port: process.env.DB_PORT,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
