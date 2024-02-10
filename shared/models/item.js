import sr from 'sequelize';
import sequelize from '../connectors/db.js';
import Warehouse from './warehause.js';
import Product from './product.js';

let DataTypes = sr.DataTypes;
let Model = sr.Model;

class Item extends Model {}
Item.init({
    
}, {
    sequelize,
    modelName: "Item"
});
Item.belongsTo(Warehouse, {foreignKey: 'warehouse'});
Item.belongsTo(Product, {foreignKey: 'product'});
 
export default Item;