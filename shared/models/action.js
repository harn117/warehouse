import sr from 'sequelize';
import sequelize from '../connectors/db.js';
import Warehouse from './warehause.js';
import Product from './product.js';

let DataTypes = sr.DataTypes;
let Model = sr.Model;

class Action extends Model {}
Action.init({
    date: { type: DataTypes.DATE,
        allowNull: false,
        validate: { notNull: {
                msg: 'La fecha de la accion es obligatorio'
            } }
    },
    quantity: { type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: {
                msg: 'La cantidad de la accion es obligatorio'
            } }
    },
}, {
    sequelize,
    modelName: "Action"
});
Action.belongsTo(Warehouse, {foreignKey: 'origin', allowNull: true});
Action.belongsTo(Warehouse, {foreignKey: 'destination', allowNull: true});
Action.belongsTo(Product, {foreignKey: 'product', allowNull: true});
 
export default Action;