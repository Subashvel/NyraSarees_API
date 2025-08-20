const { Sequelize } = require('sequelize');
// const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// async function createDatabaseIfNotExists() {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT || 3306,
//   });

//   await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
//   console.log(`✅ Database '${process.env.DB_NAME}' is ready.`);
//   await connection.end();
// }

async function initSequelize() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres', // change from mysql → postgres
      port: process.env.DB_PORT || 5433, // PostgreSQL default port
      logging: (msg) => console.log(`📄 SQL: ${msg}`),
    }
  );

  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL:', error);
  }

  return sequelize;
}

module.exports = initSequelize;