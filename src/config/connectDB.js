import { Sequelize } from 'sequelize';




const sequelize = new Sequelize('bookingcare', 'root', null, {
  host: 'localhost',
  port: '8111',
  dialect: 'mysql',
  "logging": false

});




let connectDB = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    }

module.exports = connectDB;


