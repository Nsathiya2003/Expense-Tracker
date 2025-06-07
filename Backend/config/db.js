import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sample','root','Sathiya@2003',{
  host: 'localhost',
  dialect: 'mysql',
  port:3306
});

(async ()=> {
  try {
      await sequelize.authenticate(); 
      console.log('Connection has been established successfully.');
      await sequelize.sync({alter: true});
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;
 
