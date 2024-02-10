import { Sequelize } from 'sequelize';
import _ from '../../config/global.js'

const sequelize = new Sequelize(
    _.PGDATABASE, 
    _.PGUSER,
    _.PGPASSWORD, {
       host: _.PGHOST,
       dialect: "postgres"
   }
);
export default sequelize;