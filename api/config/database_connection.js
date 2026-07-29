const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bottle_production_suite', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
  } catch (err) {
    console.error("Error:", err);
  }
}

module.exports = { sequelize, connectDB };